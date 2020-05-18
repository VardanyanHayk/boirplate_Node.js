import Categories from './model'
import BaseDAO from '../../baseDAO'

class CategoriesDAO extends BaseDAO {
  constructor() {
    super(Categories);
  }

  findAllByLevel(level) {
    return this.model
    .query()
    .where('level', level)
    .whereNull('deleted_at')
    .eager('bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind')
  }

  findById (id) {
    return this.model
      .query()
      .where('id', id)
      .whereNull('deleted_at')
      .eager('bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind.bind')
  }
  
}

export default CategoriesDAO;
