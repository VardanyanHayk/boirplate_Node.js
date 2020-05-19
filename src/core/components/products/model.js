import { Model } from 'objection'
import CategoryProducts from '../categoryProducts/model'
import Options from '../options/model'
import Measurements from '../measurements/model'
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
    }
  }
  
}
export default Products
