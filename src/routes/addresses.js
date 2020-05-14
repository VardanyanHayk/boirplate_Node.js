import express from 'express'
import address from '../core/components/addresses/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', address.findAll)

router.post('/', validateShema('addressCreate'), address.create)
router.put('/:id', validateShema('addressUpdate'), address.update)
router.delete('/:id', address.delete)

export default router
