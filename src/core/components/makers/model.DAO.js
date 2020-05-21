import Makers from './model'
import BaseDAO from '../../baseDAO'
import category from '../categories/controller';

class MakersDAO extends BaseDAO {
  constructor() {
    super(Makers);
  }
  
  findAllMakers (reqQuery) {
    const { categoryId } = reqQuery
    const query = this.findAll()
    if (categoryId) query.where("categoryId", categoryId)

    return query 
  }

}

export default MakersDAO;
