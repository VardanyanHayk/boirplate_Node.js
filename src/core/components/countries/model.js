import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Countries extends Model {
  static get tableName () {
    return 'countries'
  }
  
}
export default Countries
