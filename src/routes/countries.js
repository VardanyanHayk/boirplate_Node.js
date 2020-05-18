import express from 'express'
import country from '../core/components/countries/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()

router.get('/', country.findAllData)

router.post('/', validateShema('countryCreate'), country.createData)
router.put('/:id', validateShema('countryUpdate'), country.updateData)
router.delete('/:id', country.deleteData)

export default router
