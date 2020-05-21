import { Model } from 'objection'
import Options from '../options/model'
import knex from '../../../base/index'
Model.knex(knex)

class OptionValues extends Model {
  static get tableName () {
    return 'optionValues'
  }
  static get relationMappings () {
    return {
      option: {
        relation: Model.HasOneRelation,
        modelClass: Options,
        join: {
          from: 'optionValues.optionId',
          to: 'options.id'
        },
        modify: { deleted_at: null }
      }
    }
  }
  
}
export default OptionValues
