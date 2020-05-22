import { Model } from 'objection'
import OptionValues from '../optionValues/model'
import knex from '../../../base/index'
Model.knex(knex)

class Options extends Model {
  static get tableName () {
    return 'options'
  }

  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
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
    }
  }
  
}
export default Options
