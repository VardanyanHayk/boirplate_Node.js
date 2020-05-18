import Countries from './model'
import BaseDAO from '../../baseDAO'

class CountriesDAO extends BaseDAO {
  constructor() {
    super(Countries);
  }
  
}

export default CountriesDAO;
