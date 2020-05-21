import { ProductTypesDAO } from './model.DAO'
import { response } from '../../../utils/index';
import { query } from 'winston';

class ProductType extends ProductTypesDAO {
  constructor () {
    super();
    this.findAllData = this.findAllData.bind(this)
    this.findOneData = this.findOneData.bind(this)
    this.createData = this.createData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }
  async findAllData (req, res, next) {
    try {
      const productType = await this.findAllProductType()
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const [productType] = await this.findOne(id).eager('[makers, options, measurements]')
      if (!productType) return response(res, 400, 'Bad request')
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const productType = await this.createRelated(data)
      response(res, 200, 'Ok', productType)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const productType = await this.updateRelated(data)
      if (!productType) return response(res, 400, 'Bad request')
      response(res, 200, 'Product type was updated', productType)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [productType] = await this.delete(id)
      if (!productType) return response(res, 400, 'Bad request')
      response(res, 200, 'Product type was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const productType = new ProductType()

export default productType
