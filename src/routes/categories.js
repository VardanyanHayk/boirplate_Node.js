import express from 'express'
import categoryCtl from '../core/components/categories/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', categoryCtl.findAllData)
router.get('/:id', categoryCtl.findOneData)

router.post('/', validateShema('categoryCreate'), categoryCtl.createData)
router.put('/:id', validateShema('categoryUpdate'), categoryCtl.updateData)
router.delete('/:id', categoryCtl.deleteData)

export default router
