const { PersonNameModel } = require("./models/personName.model");
const { PatientModel } = require("./models/patient.model");
const { StudyModel } = require("./models/study.model");
const { SeriesModel } = require("./models/series.model");
const { InstanceModel } = require("./models/instance.model");
const { DicomBulkDataModel } = require("./models/dicomBulkData.model");
const { raccoonConfig } = require("@root/config-class");

const sequelizeInstance = require("./instance");
const { SeriesRequestAttributesModel } = require("./models/seriesRequestAttributes.model");
const { DicomCodeModel } = require("./models/dicomCode.model");
const { DicomContentSqModel } = require("./models/dicomContentSQ.model");
const { VerifyIngObserverSqModel } = require("./models/verifyingObserverSQ.model");
const { WorkItemModel } = require("./models/workitems.model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { UpsSubscriptionModel } = require("./models/upsSubscription.model");
const { UpsRequestAttributesModel } = require("./models/upsRequestAttributes.model");

async function initDatabasePostgres() {
    const { Client } = require("pg");
    const client = new Client({
        user: raccoonConfig.dbConfig.username,
        password: raccoonConfig.dbConfig.password,
        host: raccoonConfig.dbConfig.host,
        port: raccoonConfig.dbConfig.port,
        database: "postgres",
        logging: raccoonConfig.dbConfig.logging
    });

    await client.connect();

    try {
        let result = await client.query(`SELECT 'CREATE DATABASE ${raccoonConfig.dbConfig.database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${raccoonConfig.dbConfig.database}')`);
        if (result.rowCount > 0 ) {
            await client.query(`CREATE DATABASE ${raccoonConfig.dbConfig.database}`);
        }
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await client.end();
    }
}

async function init() {
    require("./deleteSchedule");

    if (raccoonConfig.dbConfig.dialect === "postgres") {
        await initDatabasePostgres();
    }

    try {
        await sequelizeInstance.authenticate();
        
        PatientModel.belongsTo(PersonNameModel, {
            foreignKey: "x00100010"
        });

        StudyModel.belongsTo(PatientModel, {
            foreignKey: "x00100020",
            targetKey: "x00100020"
        });

        StudyModel.belongsTo(PersonNameModel, {
            foreignKey: "x00080090"
        });

        StudyModel.hasMany(SeriesModel, {
            foreignKey: "x0020000D",
            sourceKey: "x0020000D"
        });
        SeriesModel.belongsTo(StudyModel, {
            foreignKey: "x0020000D",
            targetKey: "x0020000D"
        });

        // Performing Physician Name many to many
        SeriesModel.belongsToMany(PersonNameModel, {
            through: "PerformingPhysicianName",
            as: "performingPhysicianName",
            sourceKey: "x0020000E",
            foreignKey: "x0020000E"
        });
        PersonNameModel.belongsToMany(SeriesModel, {
            through: "PerformingPhysicianName"
        });

        // Operator's Name many to many
        SeriesModel.belongsToMany(PersonNameModel, {
            through: "OperatorsName",
            as: "operatorsName",
            sourceKey: "x0020000E",
            foreignKey: "x0020000E"
        });
        PersonNameModel.belongsToMany(SeriesModel, {
            through: "OperatorsName"
        });

        SeriesModel.hasOne(SeriesRequestAttributesModel, {
            foreignKey: "x0020000E",
            targetKey: "x0020000E"
        });

        InstanceModel.belongsTo(SeriesModel, {
            foreignKey: "x0020000E",
            targetKey: "x0020000E"
        });

        InstanceModel.hasOne(DicomCodeModel, {
            foreignKey: "SOPInstanceUID",
            sourceKey: "x00080018"
        });

        InstanceModel.hasOne(VerifyIngObserverSqModel, {
            foreignKey: "SOPInstanceUID",
            sourceKey: "x00080018"
        });
        VerifyIngObserverSqModel.hasOne(DicomCodeModel, {
            foreignKey: "x0040A088"
        });
        VerifyIngObserverSqModel.belongsTo(PersonNameModel, {
            foreignKey: "x0040A075"
        });

        InstanceModel.hasOne(DicomContentSqModel, {
            foreignKey: "SOPInstanceUID",
            sourceKey: "x00080018"
        });
        DicomContentSqModel.hasOne(DicomCodeModel, {
            as: "ConceptNameCode"
        });
        DicomContentSqModel.hasOne(DicomCodeModel, {
            as: "ConceptCode"
        });

        WorkItemModel.belongsTo(PatientModel, {
            foreignKey: "x00100020",
            targetKey: "x00100020"
        });

        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00404025",
            as: dictionary.tag["00404025"]
        });
        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00404026",
            as: dictionary.tag["00404026"]
        });
        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00404027",
            as: dictionary.tag["00404027"]
        });
        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00404009",
            as: dictionary.tag["00404009"]
        });
        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00404018",
            as: dictionary.tag["00404018"]
        });
        WorkItemModel.belongsTo(DicomCodeModel, {
            foreignKey: "x00080082",
            as: dictionary.tag["00080082"]
        });
        
        WorkItemModel.belongsTo(PersonNameModel, {
            foreignKey: "x00404037",
            as: dictionary.tag["00404037"]
        });

        WorkItemModel.hasMany(UpsSubscriptionModel);
        WorkItemModel.hasOne(UpsRequestAttributesModel, {
            foreignKey: "upsInstanceUID",
            sourceKey: "upsInstanceUID"
        });
    
        //TODO: 設計完畢後要將 force 刪除
        await sequelizeInstance.sync({
            force: raccoonConfig.dbConfig.forceSync
        });
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1);
    }
    
}

module.exports = (() => init())();


