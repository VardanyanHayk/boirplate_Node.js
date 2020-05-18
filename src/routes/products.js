import express from 'express'
import product from '../core/components/products/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', product.findAll)
router.get('/:id', product.findOne)

router.post('/', validateShema('productCreate'), product.create)
router.put('/:id', validateShema('productUpdate'), product.update)
router.delete('/:id', product.delete)

export default router
