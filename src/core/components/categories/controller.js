import Categories from './model'
import { response } from '../../../utils/index';
import { query } from 'winston';

class Category {

  async findAll (req, res, next) {
    try {
      const category = await Categories
        .query()
        .where('level', 1)
        .whereNull('deleted_at')
        .eager('bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind')
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async findOne (req, res, next) {
    try {
      const { id } = req.params
      const category = await Categories
        .query()
        .where('id', id)
        .whereNull('deleted_at')
        .eager('bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind')
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async create (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      const category = await Categories
        .query()
        .insertAndFetch(data)
      response(res, 200, 'Ok', category)
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      data.updated_at = new Date()
      const [category] = await Categories
        .query()
        .patch(data)
        .where('id', id)
        .returning('*')
      if (!category) return response(res, 400, 'Bad request')
      response(res, 200, 'Category was updated', category)
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      const [category] = await Categories
        .query()
        .patch({ deleted_at: new Date() })
        .where('id', id)
        .returning('*')
      if (!category) return response(res, 400, 'Bad request')
      response(res, 200, 'Category was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const category = new Category()

export default category
