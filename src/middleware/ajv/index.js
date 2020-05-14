import Ajv from 'ajv'
import { upload } from '../multer'

//user
import userLogin from './schema/users/userLogin'
import userCreate from './schema/users/userCreate'
import userUpdate from './schema/users/userUpdate'

//address
import addressCreate from './schema/addresses/addressCreate.json'
import addressUpdate from './schema/addresses/addressUpdate.json'

//category
import categoryCreate from './schema/categories/categoryCreate.json'
import categoryUpdate from './schema/categories/categoryUpdate.json'

//productType
import productTypeCreate from './schema/productTypes/productTypeCreate.json'
import productTypeUpdate from './schema/productTypes/productTypeUpdate.json'

const ajv = Ajv({ allErrors: true, removeAdditional: 'all' })
//user
ajv.addSchema(userCreate, 'userCreate')
ajv.addSchema(userUpdate, 'userUpdate')
ajv.addSchema(userLogin, 'userLogin')

//address
ajv.addSchema(addressCreate, 'addressCreate')
ajv.addSchema(addressUpdate, 'addressUpdate')

//category
ajv.addSchema(categoryCreate, 'categoryCreate')
ajv.addSchema(categoryUpdate, 'categoryUpdate')

//productType
ajv.addSchema(productTypeCreate, 'productTypeCreate')
ajv.addSchema(productTypeUpdate, 'productTypeUpdate')

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse (schemaErrors) {
  let [errors] = schemaErrors.map((error) => {
    console.log(error)
    return {
      code: 400,
      path: error.dataPath.split('.').slice('-1')[0],
      message: error.message
    }
  })
  return {
    code: 400,
    message: `The ${errors.path} ${errors.message}`
  }
}

/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
const validateSchema = (schemaName) => {
  return async (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors))
    }
    next()
  }
}

export default validateSchema
