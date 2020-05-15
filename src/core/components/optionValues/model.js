import { Model } from 'objection'
import knex from '../../../base/index'
Model.knex(knex)

class OptionValues extends Model {
  static get tableName () {
    return 'optionValues'
  }
  // static get relationMappings () {
  //   return {
  //     values: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Categories,
  //       join: {
  //         from: 'options.id',
  //         to: 'optionValues.optionId'
  //       },
  //       modify: { deleted_at: null }
  //     }
  //   }
  // }
  
}
export default OptionValues
