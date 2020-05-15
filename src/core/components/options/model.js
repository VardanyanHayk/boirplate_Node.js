import { Model } from 'objection'
import OptionValues from '../optionValues/model'
import knex from '../../../base/index'
Model.knex(knex)

class Options extends Model {
  static get tableName () {
    return 'options'
  }
  static get relationMappings () {
    return {
      values: {
        relation: Model.HasManyRelation,
        modelClass: OptionValues,
        join: {
          from: 'options.id',
          to: 'optionValues.optionId'
        }
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
export default Options
