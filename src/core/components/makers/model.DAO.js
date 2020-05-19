import Makers from './model'
import BaseDAO from '../../baseDAO'

class MakersDAO extends BaseDAO {
  constructor() {
    super(Makers);
  }
  
}

export default MakersDAO;
