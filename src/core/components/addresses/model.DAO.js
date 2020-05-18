import Addresses from './model'
import BaseDAO from '../../baseDAO'

class AddressesDAO extends BaseDAO {
  constructor() {
    super(Addresses);
  }

  findByUserId(id) {
    return this.model
      .query()
      .where('userId', id)
      .whereNull('deleted_at')
  }
  
}

export default AddressesDAO;
