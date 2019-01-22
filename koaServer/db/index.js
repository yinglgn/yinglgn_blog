const config = require("./../config/index");
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.MYSQL.database,
  config.MYSQL.user,
  config.MYSQL.password, {
    host: config.MYSQL.host,
    dialect: config.MYSQL.dataType,
    port: config.MYSQL.port,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  })

module.exports = sequelize
