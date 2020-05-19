import { Model } from 'objection'
import Products from '../products/model'
import knex from '../../../base/index'
Model.knex(knex)

class CategoryProducts extends Model {
  static get tableName () {
    return 'categoryProduct'
  }
  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }

}
export default CategoryProducts
