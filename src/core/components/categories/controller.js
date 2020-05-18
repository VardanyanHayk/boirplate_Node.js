import CategoriesDAO from './model.DAO'
import { response } from '../../../utils/index';
import { query } from 'winston';

class Category extends CategoriesDAO {
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
      const category = await this.findAllByLevel(1)
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const category = await this.findById(id)
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const category = await this.create(data)
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      data.updated_at = new Date()
      const [category] = await this.update(id, data)
      if (!category) return response(res, 400, 'Bad request')
      response(res, 200, 'Category was updated', category)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [category] = await this.delete(id)
      if (!category) return response(res, 400, 'Bad request')
      response(res, 200, 'Category was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const category = new Category()

export default category
