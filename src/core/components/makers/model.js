import { Model } from 'objection'
import Categories from '../categories/model'
import knex from '../../../base/index'
Model.knex(knex)

class Makers extends Model {
  static get tableName () {
    return 'makers'
  }

  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }

  static get relationMappings () {
    return {
      category: {
        relation: Model.HasManyRelation,
        modelClass: Categories,
        join: {
          from: 'makers.categoryId',
          to: 'categories.id'
        },
      },
    }
  }
}
export default Makers
