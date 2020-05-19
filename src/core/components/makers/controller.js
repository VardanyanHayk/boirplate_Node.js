import MakersDAO from './model.DAO'
import { response } from '../../../utils/index';

class Maker extends MakersDAO {
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
      const maker = await this.findAll()
      response(res, 200, 'Ok', maker)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const [maker] = await this.findOne(id)
      if (!maker) return response(res, 400, 'Bad request')
      response(res, 200, 'Ok', maker)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const maker = await this.create(data)
      response(res, 200, 'Ok', maker)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const maker = await this.update(id, data)
      if (!maker) return response(res, 400, 'Bad request')
      response(res, 200, 'Maker was updated', maker)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [maker] = await this.delete(id)
      if (!maker) return response(res, 400, 'Bad request')
      response(res, 200, 'Maker was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const maker = new Maker()

export default maker
