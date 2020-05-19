import ProductTypes from './model'
import BaseDAO from '../../baseDAO'

export class ProductTypesDAO extends BaseDAO {
  constructor() {
    super(ProductTypes);
  }
  
}

export default new ProductTypesDAO();
