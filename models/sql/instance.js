const { raccoonConfig } = require("@root/config-class");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(raccoonConfig.dbConfig); 

/**
 * @type {Sequelize}
 */
module.exports = sequelize;