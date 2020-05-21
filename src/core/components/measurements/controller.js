import MeasurementsDAO from './model.DAO'
import { response } from '../../../utils/index';

class Measurement extends MeasurementsDAO {
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
      const measurement = await this.findAll(1)
      response(res, 200, 'Ok', measurement)
    } catch (err) {
      next(err)
    }
  }

  async findOneData (req, res, next) {
    try {
      const { id } = req.params
      const measurement = await this.findOne(id)
      response(res, 200, 'Ok', measurement)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const measurement = await this.create(data)
      response(res, 200, 'Ok', measurement)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const [measurement] = await this.update(id, data)
      if (!measurement) return response(res, 400, 'Bad request')
      response(res, 200, 'Measurement was updated', measurement)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [measurement] = await this.delete(id)
      if (!measurement) return response(res, 400, 'Bad request')
      response(res, 200, 'Measurement was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const measurement = new Measurement()

export default measurement;
