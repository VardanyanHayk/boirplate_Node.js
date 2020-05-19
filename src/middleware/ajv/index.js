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

//options
import optionCreate from './schema/options/optionCreate.json'
import optionUpdate from './schema/options/optionUpdate.json'

//options
import makerCreate from './schema/makers/makerCreate.json'
import makerUpdate from './schema/makers/makerUpdate.json'


//emporium
import emporiumCreate from './schema/emporiums/emporiumCreate.json'
import emporiumUpdate from './schema/emporiums/emporiumUpdate.json'

//product
import productCreate from './schema/products/productCreate.json'
import productUpdate from './schema/products/productUpdate.json'

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

//option
ajv.addSchema(optionCreate, 'optionCreate')
ajv.addSchema(optionUpdate, 'optionUpdate')

//makers
ajv.addSchema(makerCreate, 'makerCreate')
ajv.addSchema(makerUpdate, 'makerUpdate')

//exmporium
ajv.addSchema(emporiumCreate, 'emporiumCreate')
ajv.addSchema(emporiumUpdate, 'emporiumUpdate')

//product
ajv.addSchema(productCreate, 'productCreate')
ajv.addSchema(productUpdate, 'productUpdate')

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
