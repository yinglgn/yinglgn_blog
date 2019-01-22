/**
 * 配置文件
 */
const production = {
  //服务器端口
  SERVER_PORT: 3000,

  //redis配置
  REDIS: {
    host: "localhost",
    port: 6379,
    password: "abcd",
    maxAge: 3600000
  },

  //mysql配置
  MYSQL: {
    dataType: 'mysql',
    host: "localhost",
    user: "root",
    password: null,
    port: "3306",
    database: "yinglgn_blog",
    supportBigNumbers: true,
    multipleStatements: true,
    timezone: "utc"
  }
};

const development = {
  //服务器端口
  SERVER_PORT: 3000,

  //redis配置
  REDIS: {
    host: "localhost",
    port: 6379,
    password: "abcd",
    maxAge: 3600000
  },

  //mysql配置
  MYSQL: {
    dataType: 'mysql',
    host: "localhost",
    user: "root",
    password: null,
    port: "3306",
    database: "yinglgn_blog",
    supportBigNumbers: true,
    multipleStatements: true,
    timezone: "utc"
  }
};

const config = development;

module.exports = config;
