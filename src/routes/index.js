import express from 'express'
import users from './users'
import addresses from './addresses'
import categories from './categories'
import productTypes from './productTypes'
import emporiums from './emporiums'
import countries from './countries'
import products from './products'

import { Auth } from '../middleware/passport/routes'
import log from '../middleware/logger'

const router = express.Router()

router.use('/user', users)

router.use(Auth)

router.use('/address', addresses)
router.use('/category', categories)
router.use('/product_type', productTypes)
router.use('/emporium', emporiums)
router.use('/country', countries)
router.use('/product', products)

export default router
