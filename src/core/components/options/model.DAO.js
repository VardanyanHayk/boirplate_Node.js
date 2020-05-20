import Options from './model'
import BaseDAO from '../../baseDAO'

class OptionsDAO extends BaseDAO {
  constructor() {
    super(Options);
  }
  
  findAllOptions (reqQuery) {
    const { categoryId } = reqQuery
    const query = this.findAll().eager('values')

    if (categoryId) query.where("categoryId", categoryId)

    return query
  }
}

export default OptionsDAO;
