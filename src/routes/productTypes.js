import express from 'express'
import productTypeCtl from '../core/components/productTypes/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', productTypeCtl.findAllData)
router.get('/:id', productTypeCtl.findOneData)

router.post('/', validateShema('productTypeCreate'), productTypeCtl.createData)
router.put('/:id', validateShema('productTypeUpdate'), productTypeCtl.updateData)
router.delete('/:id', productTypeCtl.deleteData)

export default router
