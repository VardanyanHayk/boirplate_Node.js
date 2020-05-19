import express from 'express'
import productCtl from '../core/components/products/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', productCtl.findAllData)
router.get('/:id', productCtl.findOneData)

router.post('/', validateShema('productCreate'), productCtl.createData)
router.put('/:id', validateShema('productUpdate'), productCtl.updateData)
router.delete('/:id', productCtl.deleteData)

export default router
