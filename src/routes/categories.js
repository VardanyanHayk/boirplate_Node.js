import express from 'express'
import category from '../core/components/categories/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', category.findAll)
router.get('/:id', category.findOne)

router.post('/', validateShema('categoryCreate'), category.create)
router.put('/:id', validateShema('categoryUpdate'), category.update)
router.delete('/:id', category.delete)

export default router
