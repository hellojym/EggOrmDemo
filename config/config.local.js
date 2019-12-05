'use strict';
module.exports = () => {
  const config = exports = {};

  // 本地mysql配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '8888',
    port: 3306,
    database: 'books',
    delegate: 'msmodel',
    baseDir: 'msmodel',
    operatorsAliases: false,
  };

  // 本地redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
    agent: true,
  };

  // 环境
  config.env = 'local';

  // MongoDB配置
  config.mongoose = {
    clients: {
      // clientId, access the client instance by app.mongooseDB.get('clientId')
      db1: {
        url: 'mongodb://127.0.0.1/student',
        options: {},
      },
    },
  };

  return config;
};
