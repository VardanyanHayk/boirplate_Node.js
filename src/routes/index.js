import express from 'express';
import users from './users';

import { Auth } from '../middleware/passport/routes';

const router = express.Router();

router.use('/user', users);

router.use(Auth);

//auth routes

export default router;
