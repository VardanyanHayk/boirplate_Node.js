import express from 'express'
import measurementCtl from '../core/components/measurements/controller'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', measurementCtl.findAllData)

router.post('/', validateShema('measurementCreate'), measurementCtl.createData)
router.put('/:id', validateShema('measurementUpdate'), measurementCtl.updateData)
router.delete('/:id', measurementCtl.deleteData)

export default router
