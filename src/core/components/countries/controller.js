import CountriesDAO from './model.DAO'
import { response } from '../../../utils/index';

class Country extends CountriesDAO {
  constructor () {
    super();
    this.findAllData = this.findAllData.bind(this)
    this.createData = this.createData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }
  async findAllData (req, res, next) {
    try {
      const country = await this.findAll()
      response(res, 200, 'Ok', country)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { data } = req.body
      const country = await this.create(data)
      response(res, 200, 'Ok', country)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const [country] = await this.update(id, data)
      if (!country) return response(res, 400, 'Bad request')
      response(res, 200, 'Country was updated', country)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [country] = await this.delete(id)
      if (!country) return response(res, 400, 'Bad request')
      response(res, 200, 'Country was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const country = new Country()

export default country
