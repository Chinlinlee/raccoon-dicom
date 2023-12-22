const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { raccoonConfig } = require("@root/config-class");
const { DicomJsonModel } = require("../dicom-json-model");
const { MwlQueryBuilder } = require("@root/api-sql/dicom-web/controller/MWL-RS/service/query/mwlQueryBuilder");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

class MwlItemModel extends Model {
    async getAttributes() {
        let obj = this.toJSON();
        let jsonStr = JSON.stringify(obj.json);
        return await Common.getAttributesFromJsonString(jsonStr);
    }

    toDicomJsonModel() {
        return new DicomJsonModel(this.json);
    }
    static async getDicomJson (queryOptions) {
        let queryBuilder = new MwlQueryBuilder(queryOptions);
        let q = queryBuilder.build();

        let mwlItems = await MwlItemModel.findAll({
            ...q,
            attributes: ["json"],
            limit: queryOptions.limit,
            offset: queryOptions.skip
        });

        return await Promise.all(mwlItems.map(async item => {
            return item.json;
        }));
    }

    static async getCount(query) {
        let queryBuilder = new MwlQueryBuilder({query});
        let q = queryBuilder.build();
        return await this.count({
            ...q
        });
    }

    static async deleteByStudyInstanceUIDAndSpsID(studyUID, spsID) {
        let deletedCount = await MwlItemModel.destroy({
            where: {
                study_instance_uid: studyUID,
                sps_id: spsID
            }
        });
        return { deletedCount };
    }
};

/** @type { import("sequelize").ModelAttributes } */
const MwlItemSchema = {
    // 0020000D
    study_instance_uid: {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true
    },
    // 00100010
    patient_id: {
       type: vrTypeMapping.LO,
       allowNull: false 
    },
    // 00800050
    accession_number: {
        type: vrTypeMapping.SH
    },
    // 00800051.00400031
    accno_local_id: {
        type: vrTypeMapping.UT
    },
    // 00800051.00400032
    accno_universal_id: {
        type: vrTypeMapping.UT
    },
    // 00800051.00400033
    accno_universal_id_type: {
        type: vrTypeMapping.CS
    },
    // 00401001
    requested_procedure_id: {
        type: vrTypeMapping.SH
    },
    // 00380010
    admission_id: {
        type: vrTypeMapping.LO
    },
    // 00380014.00400031
    issuer_admission_local_id: {
        type: vrTypeMapping.UT
    },
    // 00380014.00400032
    issuer_admission_universal_id: {
        type: vrTypeMapping.UT
    },
    // 00380014.00400033
    issuer_admission_universal_id_type: {
        type: vrTypeMapping.CS
    },
    // TODO Scheduled Procedure Step Sequence
    // 0040,0100.00400001
    station_ae_title: {
        type: vrTypeMapping.AE
    },
    // 0040,0100.00400010
    station_name: {
        type: vrTypeMapping.SH
    },
    // 0040,0100.00400002
    start_date: {
        type: vrTypeMapping.DA
    },
    // 0040,0100.00400004
    end_date: {
        type: vrTypeMapping.DA
    },
    // 0040,0100.00400003
    start_time: {
        type: vrTypeMapping.DT
    },
    // 0040,0100.00400005
    end_time: {
        type: vrTypeMapping.DT
    },
    // 0040,0100.00400006
    physician_name: {
        //* must reference to PersonName model
        type: vrTypeMapping.PN
    },
    // 0040,0100.00400011
    procedure_step_location: {
        type: vrTypeMapping.SH
    },
    // 0040,0100.00400007
    description: {
        type: vrTypeMapping.LO
    },
    // 0040,0100.00400008
    protocol_code: {
        // reference to dicom code model
        type: DataTypes.INTEGER
    },
    // 00080080
    institution_name: {
        type: vrTypeMapping.LO
    },
    // 00081040
    institution_department_name: {
        type: vrTypeMapping.LO
    },
    // Reference to Dicom Code Model
    // 00081041
    institution_department_type_code: {
        type: DataTypes.INTEGER
    },
    // Reference to Dicom Code Model
    // 00080082
    institution_code: {
        type: DataTypes.INTEGER
    },
    // 00400100.00400009
    sps_id: {
        type: vrTypeMapping.SH
    },
    // 00400100.00400020
    sps_status: {
        type: vrTypeMapping.CS
    },
    // 00400100.00080060
    modality: {
        type: vrTypeMapping.CS
    },
    json: {
        type: vrTypeMapping.JSON
    }
};


MwlItemModel.init(MwlItemSchema, {
    sequelize: sequelizeInstance,
    modelName: "mwl_item",
    tableName: "mwl_item",
    freezeTableName: true
});

module.exports.MwlItemModel = MwlItemModel;
module.exports.MwlItemSchema = MwlItemSchema;
