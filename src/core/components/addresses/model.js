import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Addresses extends Model {
  static get tableName () {
    return 'address'
  }
  
}
export default Addresses
