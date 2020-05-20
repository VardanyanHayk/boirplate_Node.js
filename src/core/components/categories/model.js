import { Model } from 'objection'
import Makers from '../makers/model'
import knex from '../../../base/index'
Model.knex(knex)

class Categories extends Model {
  static get tableName () {
    return 'categories'
  }

  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }
  
  static get relationMappings () {
    return {
      bind: {
        relation: Model.HasManyRelation,
        modelClass: Categories,
        join: {
          from: 'categories.id',
          to: 'categories.bindId'
        },
        modify: { deleted_at: null }
      },
      makers: {
        relation: Model.HasManyRelation,
        modelClass: Makers,
        join: {
          from: 'categories.id',
          to: 'makers.categoryId'
        }
      },
    }
  }
  
}
export default Categories
