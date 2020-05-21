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
    console.log(categoryId)
    const query = this.findAll()
      .select(raw('distinct on ("productTypeId") "productTypeId"'), '*')
      .eager('[emporium]')

    if (categoryId) query.joinRelation('categoryIds').where('categoryId', categoryId)
    if (productTypeId) query.where('productTypeId', productTypeId)
    return query
  }
  
}

export default ProductsDAO;
