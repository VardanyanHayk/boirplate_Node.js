import Products from './model'
import { response } from '../../../utils/index';
import { query } from 'winston';

class Product {

  async findAll (req, res, next) {
    try {
      const product = await Products
        .query()
        .whereNull('deleted_at')
        // .eager('[options, options.values, makers, measurements]')
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async findOne (req, res, next) {
    try {
      const { id } = req.params
      const [product] = await Products
        .query()
        .where('categoryId', id)
        .whereNull('deleted_at')
        // .eager('[options, options.values, makers, measurements]')
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async create (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const product = await Products
        .query()
        .upsertGraph(data, { relate: true })
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const product = await Products
        .query()
        .upsertGraph(data, { relate: true })
        // .where('id', id)
        // .returning('*')
      if (!product) return response(res, 400, 'Bad request')
      response(res, 200, 'Product was updated', product)
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      const [product] = await Products
        .query()
        .patch({ deleted_at: new Date() })
        .where('id', id)
        .returning('*')
      if (!product) return response(res, 400, 'Bad request')
      response(res, 200, 'Product was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const product = new Product()

export default product
