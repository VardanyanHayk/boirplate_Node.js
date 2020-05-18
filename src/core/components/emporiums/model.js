import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Emporiums extends Model {
  static get tableName () {
    return 'emporiums'
  }
  
}
export default Emporiums
