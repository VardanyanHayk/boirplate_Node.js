const Knex = require('knex');
const { Model } = require('objection');

const nconf = require('../../config');

const env = nconf.get('NODE_ENV') || 'development';
const dbConfig = nconf.get('db')[env];

const Database = Knex(dbConfig);

Model.knex(Database);

(async function () {
  await Database.select().from('users')
    .then((version) => console.log('knex connected succsessfully')
    ).catch((err) => {
      console.log(err)
      throw err
    })
}())

export default Database
