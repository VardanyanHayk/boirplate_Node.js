import Addresses from './model'
import { response } from '../../../utils/index';

class Address {

  async findAll (req, res, next) {
    try {
      const { id } = req.user
      const address = await Addresses
        .query()
        .where('id', id)
        .whereNull('deleted_at')
      response(res, 200, 'Ok', address)
    } catch (err) {
      next(err)
    }
  }

  async create (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      data.userId = id
      const address = await Addresses
        .query()
        .insertAndFetch(data)
      response(res, 200, 'Ok', address)
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      data.updated_at = new Date()
      const [address] = await Addresses
        .query()
        .patch(data)
        .where('id', id)
        .returning('*')
      if (!address) return response(res, 400, 'Bad request')
      response(res, 200, 'Address was updated', address)
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      console.log('asasfsa', id)
      const [address] = await Addresses
        .query()
        .patch({ deleted_at: new Date() })
        .where('id', id)
        .returning('*')
      if (!address) return response(res, 400, 'Bad request')
      response(res, 200, 'Address was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const address = new Address()

export default address
