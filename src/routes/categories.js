import express from 'express'
import category from '../core/components/categories/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', category.findAllData)
router.get('/:id', category.findOneData)

router.post('/', validateShema('categoryCreate'), category.createData)
router.put('/:id', validateShema('categoryUpdate'), category.updateData)
router.delete('/:id', category.deleteData)

export default router
