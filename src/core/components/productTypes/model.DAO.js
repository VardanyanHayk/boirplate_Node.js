import ProductTypes from './model'
import BaseDAO from '../../baseDAO'

export class ProductTypesDAO extends BaseDAO {
  constructor() {
    super(ProductTypes);
  }
  
  findAllProductType () {
    return this.findAll()
      .eager('[makers, optionValues]')
      .modifyEager('optionValues', (query) => {
        query.joinRelation('option').select('optionValues.*', 'name')
      })

  }
}

export default new ProductTypesDAO();
