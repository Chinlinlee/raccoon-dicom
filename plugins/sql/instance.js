const { raccoonConfig } = require("@root/config-class");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(raccoonConfig.sqlDbConfig); 

/**
 * @type {Sequelize}
 */
module.exports = sequelize;