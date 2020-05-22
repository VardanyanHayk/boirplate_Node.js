import Products from './model'
import BaseDAO from '../../baseDAO'
import { raw } from 'objection'

class ProductsDAO extends BaseDAO {
  constructor() {
    super(Products);
  }

  findAllProducts (reqQuery) {
    const {
      categoryId,
      productTypeId
    } = reqQuery
    const query = this.findAll()
      .select(raw('distinct on ("productTypeId") "productTypeId"'), '*')
      .withGraphFetched('[emporium, measurement]')

    if (categoryId) query.joinRelated('categoryIds').where('categoryId', categoryId)
    if (productTypeId) query.where('productTypeId', productTypeId)
    return query
  }

  findOneProduct (id) {
    return this.findOne(id)
        .withGraphFetched('[emporium, optionValues]')
        .modifyEager('optionValues', (query) => {
          query
              .joinRelated('option')
              .select( 'name')
              .omit('created_at')
        })
  }
  
}

export default ProductsDAO;
