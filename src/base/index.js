import { options } from './config'
import Knex from 'knex'
import 'dotenv/config'

let option = {}
const { devMode } = process.env

if (devMode === 'test') option = options.test
if (devMode === 'prod') option = options.prod
const knex = Knex(option);

(async function () {
  await knex.select().from('users')
    .then((version) => console.log('knex connected succsessfully')
    ).catch((err) => {
      console.log(err)
      throw err
    })
}())

export default knex
