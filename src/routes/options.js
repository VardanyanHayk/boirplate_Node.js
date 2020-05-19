import express from 'express'
import optionCtl from '../core/components/options/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', optionCtl.findAllData)
router.get('/:id', optionCtl.findOneData)

router.post('/', validateShema('optionCreate'), optionCtl.createData)
router.put('/:id', validateShema('optionUpdate'), optionCtl.updateData)
router.delete('/:id', optionCtl.deleteData)

export default router
