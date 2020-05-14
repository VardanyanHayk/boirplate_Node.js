import express from 'express'
import user from '../core/components/users/controller'
import { Auth } from '../middleware/passport/routes'
import { upload } from '../middleware/multer'
import validateShema from '../middleware/ajv/index'

import authorize from '../middleware/passport/strategies/role'

const router = express.Router()
router.post('/register', validateShema('userCreate'), user.create)

router.post('/login', validateShema('userLogin'), user.login);
router.post('/refresh', user.refreshToken)
router.post('/forgot', user.forgotPassword)
router.put('/password', user.updateForgotPassword)

router.post('/image', Auth, upload, user.uploadImage)
router.get('/data', Auth, user.data)
router.put('/', Auth, validateShema('userUpdate'), user.update)

router.delete('/:id', Auth, user.delete)


export default router
