const nconf = require('./config/index');

const config = nconf.get('db');

module.exports = config;
