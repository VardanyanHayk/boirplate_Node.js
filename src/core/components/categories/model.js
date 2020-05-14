import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class Categories extends Model {
  static get tableName () {
    return 'categories'
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
      // tours: {
      //   relation: Model.HasOneRelation,
      //   modelClass: Tours,
      //   join: {
      //     from: 'bookings.tourId',
      //     to: 'tours.id'
      //   }
      // },
      // reseller: {
      //   relation: Model.HasOneRelation,
      //   modelClass: Users,
      //   join: {
      //     from: 'bookings.resellerId',
      //     to: 'users.id'
      //   }
      // },
    }
  }
  
}
export default Categories
