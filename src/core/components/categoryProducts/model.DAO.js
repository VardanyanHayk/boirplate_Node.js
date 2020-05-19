import CategoryProducts from './model'
import BaseDAO from '../../baseDAO'

class CategoryProductsDAO extends BaseDAO {
  constructor() {
    super(CategoryProducts);
  }
  
}

export default CategoryProductsDAO;
