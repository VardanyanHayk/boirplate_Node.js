import { Model } from 'objection'
import Makers from '../makers/model'
import Options from '../options/model'
import Measurements from '../measurements/model'
import knex from '../../../base/index'
Model.knex(knex)

class ProductTypes extends Model {
  static get tableName () {
    return 'productTypes'
  }
  static get relationMappings () {
    return {
      makers: {
        relation: Model.HasManyRelation,
        modelClass: Makers,
        join: {
          from: 'productTypes.id',
          to: 'makers.productTypeId'
        },
      },
      options: {
        relation: Model.HasManyRelation,
        modelClass: Options,
        join: {
          from: 'productTypes.id',
          to: 'options.productTypeId'
        },
      },
      measurements: {
        relation: Model.HasOneRelation,
        modelClass: Measurements,
        join: {
          from: 'productTypes.id',
          to: 'measurements.productTypeId'
        },
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
export default ProductTypes
