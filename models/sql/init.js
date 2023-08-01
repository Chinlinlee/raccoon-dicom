const { PersonNameModel } = require("./models/personName.model");
const { PatientModel } = require("./models/patient.model");
const { StudyModel } = require("./models/study.model");
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
    
        //TODO: 設計完畢後要將 force 刪除
        await sequelizeInstance.sync({force: true});
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1);
    }
    
}

module.exports = (() => init())();


