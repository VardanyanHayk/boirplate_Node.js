import passport from 'passport';

import { jwt } from './strategies/jwt';

import { Login } from './strategies/local';

passport.use('jwt', jwt);
passport.use('login', Login);
