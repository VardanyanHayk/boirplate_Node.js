import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Makers extends Model {
  static get tableName () {
    return 'makers'
  }
}
export default Makers
