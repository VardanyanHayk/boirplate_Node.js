import EmporiumsDAO from './model.DAO';
import { response } from '../../../utils/index';

class Emporium extends EmporiumsDAO {
  constructor () {
    super();
    this.findAllData = this.findAllData.bind(this)
    this.createData = this.createData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }
  
  async findAllData (req, res, next) {
    try {
      const emporium = await this.findAll()
      response(res, 200, 'Ok', emporium)
    } catch (err) {
      next(err)
    }
  }

  async createData (req, res, next) {
    try {
      const { data } = req.body
      const emporium = await this.create(data)
      response(res, 200, 'Ok', emporium)
    } catch (err) {
      next(err)
    }
  }

  async updateData (req, res, next) {
    try {
      const { id } = req.params
      const { data } = req.body
      const [emporium] = await this.update(id, data)
      if (!emporium) return response(res, 400, 'Bad request')
      response(res, 200, 'Emporium was updated', emporium)
    } catch (err) {
      next(err)
    }
  }

  async deleteData (req, res, next) {
    try {
      const { id } = req.params
      const [emporium] = await this.delete(id)
      if (!emporium) return response(res, 400, 'Bad request')
      response(res, 200, 'Emporium was deleted')
    } catch (err) {
      next(err)
    }
  }

}

const emporium = new Emporium()

export default emporium
