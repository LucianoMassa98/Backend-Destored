console.log('aqui 11..........');
const Sequelize = require('sequelize');
console.log('aqui 1a1..........');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}
console.log('aqui 21..........');
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
console.log('aqui 22'+config.isProd);
const dat = new Sequelize(config.dbUrl,options);

console.log('aqui 23');
setupModels(dat);


module.exports = dat;
