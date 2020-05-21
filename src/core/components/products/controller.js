import ProductsDAO from './model.DAO'
import productTypesDAO from '../productTypes/model.DAO'
import { response } from '../../../utils/index'

class Product extends ProductsDAO {
  constructor () {
    super()
    this.findAllData = this.findAllData.bind(this)
    this.findOneData = this.findOneData.bind(this)
    this.createData = this.createData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }
  async findAllData (req, res, next) {
    try {
      const { query } = req
      const product = await this.findAllProducts(query)
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const [product] = await this.findOneProduct(id)
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const [productType] = await productTypesDAO.findOne(data.productTypeId)
      if (!productType) return response(res, 400, 'Bad request')
      data.userId = id
      data.name = productType.name
      data.description = productType.description
      data.categoryIds = data.categoryIds.map(it => {
        return {
          categoryId: it
        }
      })
      const product = await this.createRelated(data)
      response(res, 200, 'Ok', product)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const product = await this.updateRelated(data)
      if (!product) return response(res, 400, 'Bad request')
      response(res, 200, 'Product was updated', product)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [product] = await this.delete(id)
      if (!product) return response(res, 400, 'Bad request')
      response(res, 200, 'Product was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const product = new Product()

export default product
