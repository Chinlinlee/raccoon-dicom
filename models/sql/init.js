const { PersonNameModel } = require("./models/personName.model");
const { PatientModel } = require("./models/patient.model");
const { StudyModel } = require("./models/study.model");
const { SeriesModel } = require("./models/series.model");
const { InstanceModel } = require("./models/instance.mode");
const { DicomBulkDataModel } = require("./models/dicomBulkData.model");
const { raccoonConfig } = require("@root/config-class");

const sequelizeInstance = require("./instance");
const { SeriesRequestAttributesModel } = require("./models/seriesRequestAttributes.model");

async function initDatabasePostgres() {
    const { Client } = require("pg");
    const client = new Client({
        user: raccoonConfig.sqlDbConfig.username,
        password: raccoonConfig.sqlDbConfig.password,
        host: raccoonConfig.sqlDbConfig.host,
        port: raccoonConfig.sqlDbConfig.port,
        database: "postgres"
    });

    await client.connect();

    try {
        let result = await client.query(`SELECT 'CREATE DATABASE ${raccoonConfig.sqlDbConfig.database}' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${raccoonConfig.sqlDbConfig.database}')`);
        if (result.rowCount > 0 ) {
            await client.query(`CREATE DATABASE ${raccoonConfig.sqlDbConfig.database}`);
        }
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await client.end();
    }
}

async function init() {

    if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
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
    
        //TODO: 設計完畢後要將 force 刪除
        await sequelizeInstance.sync();
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1);
    }
    
}

module.exports = (() => init())();


