import express from 'express'
import emporiumCtl from '../core/components/emporiums/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', emporiumCtl.findAllData)

router.post('/', validateShema('emporiumCreate'), emporiumCtl.createData)
router.put('/:id', validateShema('emporiumUpdate'), emporiumCtl.updateData)
router.delete('/:id', emporiumCtl.deleteData)

export default router
