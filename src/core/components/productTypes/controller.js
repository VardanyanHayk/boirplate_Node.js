import ProductTypes from './model'
import { response } from '../../../utils/index';
import { query } from 'winston';

class ProductType {

  async findAll (req, res, next) {
    try {
      const productType = await ProductTypes
        .query()
        .whereNull('deleted_at')
        .eager('[options, options.values, makers, measurements]')
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async findOne (req, res, next) {
    try {
      const { id } = req.params
      const [productType] = await ProductTypes
        .query()
        .where('categoryId', id)
        .whereNull('deleted_at')
        .eager('[options, options.values, makers, measurements]')
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async create (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const productType = await ProductTypes
        .query()
        .upsertGraph(data, { relate: true })
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const productType = await ProductTypes
        .query()
        .upsertGraph(data, { relate: true })
        // .where('id', id)
        // .returning('*')
      if (!productType) return response(res, 400, 'Bad request')
      response(res, 200, 'Product type was updated', productType)
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      const [productType] = await ProductTypes
        .query()
        .patch({ deleted_at: new Date() })
        .where('id', id)
        .returning('*')
      if (!productType) return response(res, 400, 'Bad request')
      response(res, 200, 'Product type was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const productType = new ProductType()

export default productType
