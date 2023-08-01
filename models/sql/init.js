const { PersonNameModel } = require("./models/personName.model");
const { PatientModel } = require("./models/patient.model");
const { StudyModel } = require("./models/study.model");
const { SeriesModel } = require("./models/series.model");
const { InstanceModel } = require("./models/instance.mode");
const { DicomBulkDataModel } = require("./models/dicomBulkData.model");

const sequelizeInstance = require("./instance");

async function init() {
    try {
        await sequelizeInstance.authenticate();
        
        PatientModel.belongsTo(PersonNameModel, {
            foreignKey: "x00100010"
        });
        StudyModel.belongsTo(PatientModel, {
            foreignKey: "x00100020",
            targetKey: "x00100020"
        });
        SeriesModel.belongsTo(StudyModel, {
            foreignKey: "x0020000D",
            targetKey: "x0020000D"
        });
        InstanceModel.belongsTo(SeriesModel, {
            foreignKey: "x0020000E",
            targetKey: "x0020000E"
        });
    
        //TODO: 設計完畢後要將 force 刪除
        await sequelizeInstance.sync({force: true});
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1);
    }
    
}

module.exports = (() => init())();


