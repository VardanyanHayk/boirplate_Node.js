import { Model } from 'objection'
import CategoryProducts from '../categoryProducts/model'
import Options from '../options/model'
import OptionValues from '../optionValues/model'
import Measurements from '../measurements/model'
import Emporiums from '../emporiums/model'
import knex from '../../../base/index'
Model.knex(knex)

class Products extends Model {
  static get tableName () {
    return 'products'
  }
  async $beforeUpdate() {
    if (!this.deleted_at) this.updated_at = new Date()
  }
  static get relationMappings () {
    return {
      categoryIds: {
        relation: Model.HasManyRelation,
        modelClass: CategoryProducts,
        join: {
          from: 'products.id',
          to: 'categoryProduct.productId'
        },
      },
      optionValues: {
        relation: Model.HasManyRelation,
        modelClass: OptionValues,
        join: {
          from: 'products.productTypeId',
          to: 'optionValues.productTypeId'
        },
      },
      measurement: {
        relation: Model.ManyToManyRelation,
        modelClass: Measurements,
        join: {
          from: 'products.productTypeId',
          through: {
            from: 'productTypes.id',
            to: 'productTypes.measurementId'
          },
          to: 'measurements.id'
        },
      },
      emporium: {
        relation: Model.HasOneRelation,
        modelClass: Emporiums,
        join: {
          from: 'products.emporiumId',
          to: 'emporiums.id'
        },
      },
    }
  }
  
}
export default Products
