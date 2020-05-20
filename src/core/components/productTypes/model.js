import { Model } from 'objection'
import Makers from '../makers/model'
import OptionValues from '../optionValues/model'
import Measurements from '../measurements/model'
import knex from '../../../base/index'
Model.knex(knex)

class ProductTypes extends Model {
  static get tableName () {
    return 'productTypes'
  }
  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }
  static get relationMappings () {
    return {
      makers: {
        relation: Model.HasOneRelation,
        modelClass: Makers,
        join: {
          from: 'productTypes.makerId',
          to: 'makers.id'
        },
      },
      optionValues: {
        relation: Model.HasManyRelation,
        modelClass: OptionValues,
        join: {
          from: 'productTypes.id',
          to: 'optionValues.productTypeId'
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
    }
  }
  
}
export default ProductTypes
