import express from 'express'
import addressCtl from '../core/components/addresses/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', addressCtl.findAllData)

router.post('/', validateShema('addressCreate'), addressCtl.createData)
router.put('/:id', validateShema('addressUpdate'), addressCtl.updateData)
router.delete('/:id', addressCtl.deleteData)

export default router
