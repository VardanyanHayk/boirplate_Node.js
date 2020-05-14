import express from 'express'
import productType from '../core/components/productTypes/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', productType.findAll)
router.get('/:id', productType.findOne)

router.post('/', validateShema('productTypeCreate'), productType.create)
router.put('/:id', validateShema('productTypeUpdate'), productType.update)
router.delete('/:id', productType.delete)

export default router
