import { Model } from 'objection'
import CategoryProducts from '../categoryProducts/model'
import Options from '../options/model'
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
      options: {
        relation: Model.ManyToManyRelation,
        modelClass: Options,
        join: {
          from: 'products.productTypeId',
          through: {
            from: 'optionValues.productTypeId',
            to: 'optionValues.optionId'
          },
          to: 'options.id'
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
