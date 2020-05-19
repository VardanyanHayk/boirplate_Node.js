import express from 'express'
import makerCtl from '../core/components/makers/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', makerCtl.findAllData)
router.get('/:id', makerCtl.findOneData)

router.post('/', validateShema('makerCreate'), makerCtl.createData)
router.put('/:id', validateShema('makerUpdate'), makerCtl.updateData)
router.delete('/:id', makerCtl.deleteData)

export default router
