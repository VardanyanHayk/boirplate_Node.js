import AddressesDAO from './model.DAO'
import { response } from '../../../utils/index';

class Address extends AddressesDAO {
  constructor () {
    super();
    this.findAllData = this.findAllData.bind(this)
    this.createData = this.createData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }
  async findAllData (req, res, next) {
    try {
      const { id } = req.user
      const address = await this.findByUserId(id)
      response(res, 200, 'Ok', address)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      data.userId = id
      const address = await this.create(data)
      response(res, 200, 'Ok', address)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      data.updated_at = new Date()
      const [address] = await this.update(id, data)
      if (!address) return response(res, 400, 'Bad request')
      response(res, 200, 'Address was updated', address)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [address] = await this.delete(id)
      if (!address) return response(res, 400, 'Bad request')
      response(res, 200, 'Address was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const address = new Address()

export default address
