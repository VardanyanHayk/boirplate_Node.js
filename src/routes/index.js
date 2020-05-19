import express from 'express'
import users from './users'
import addresses from './addresses'
import categories from './categories'
import productTypes from './productTypes'
import options from './options'
import makers from './makers'
import emporiums from './emporiums'
import products from './products'

import { Auth } from '../middleware/passport/routes'

const router = express.Router()

router.use('/user', users)

router.use(Auth)

router.use('/address', addresses)
router.use('/category', categories)
router.use('/product_type', productTypes)
router.use('/option', options)
router.use('/maker', makers)
router.use('/emporium', emporiums)
router.use('/product', products)

export default router
