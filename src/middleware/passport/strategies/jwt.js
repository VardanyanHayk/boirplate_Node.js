import passportJWT from 'passport-jwt';
import Users from '../../../core/components/users/model';
import nconf from '../../../../config';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const secret = nconf.get('jwt:secret');

export const jwt = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  ignoreExpiration: true,
},
async (jwtPayload, cb) => {
  console.log(jwtPayload);
  const [user] = await Users
    .query()
    .select('*')
    .where('id', jwtPayload.id)
    .where('password', jwtPayload.password)
    .whereNull('deleted_at');
  // delete user.password
  if (user) {
    return cb(null, user);
  }
  return cb(null, false);
});
