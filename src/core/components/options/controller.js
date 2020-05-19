import OptionsDAO from './model.DAO'
import { response } from '../../../utils/index';

class Option extends OptionsDAO {
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
      const option = await this.findAll()
      response(res, 200, 'Ok', option)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const [option] = await this.findOne(id)
      if (!option) return response(res, 400, 'Bad request')
      response(res, 200, 'Ok', option)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const option = await this.create(data)
      response(res, 200, 'Ok', option)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const option = await this.update(id, data)
      if (!option) return response(res, 400, 'Bad request')
      response(res, 200, 'Option was updated', option)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [option] = await this.delete(id)
      if (!option) return response(res, 400, 'Bad request')
      response(res, 200, 'Option was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const option = new Option()

export default option
