const { PersonNameModel } = require("./models/personName.model");
const { PatientModel } = require("./models/patient.model");
const sequelizeInstance = require("./instance");

async function init() {
    try {
        await sequelizeInstance.authenticate();
        
        PatientModel.belongsTo(PersonNameModel, {
            foreignKey: "x00100010"
        });
    
        await sequelizeInstance.sync({force: true});
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1);
    }
    
}

module.exports = (() => init())();


