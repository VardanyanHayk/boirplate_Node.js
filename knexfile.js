const nconf = require('./config');

const config = nconf.get('db');

export default config;
