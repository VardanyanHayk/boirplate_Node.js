import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Addresses extends Model {
  static get tableName () {
    return 'address'
  }
  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }
}
export default Addresses
