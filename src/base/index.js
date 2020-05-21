const Knex = require('knex');
const { Model } = require('objection');

const nconf = require('../../config');

const env = nconf.get('NODE_ENV') || 'development';
const dbConfig = nconf.get('db')[env];

const Database = Knex(dbConfig);

Model.knex(Database);

(function () {
  Database.select().from('users')
    .then(() => console.log('knex connected successfully'))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}());

export default Database;
