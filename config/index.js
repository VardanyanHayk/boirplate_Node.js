const dotEnv = require('dotenv');
dotEnv.config();
const nconf = require('nconf');

nconf
  .argv()
  .env()
  .file({ file: `${__dirname}/config.json` });

module.exports = nconf;
