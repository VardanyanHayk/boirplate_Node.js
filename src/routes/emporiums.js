import express from 'express'
import emporium from '../core/components/emporiums/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', emporium.findAllData)

router.post('/', validateShema('emporiumCreate'), emporium.createData)
router.put('/:id', validateShema('emporiumUpdate'), emporium.updateData)
router.delete('/:id', emporium.deleteData)

export default router
