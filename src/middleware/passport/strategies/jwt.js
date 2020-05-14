import passportJWT from 'passport-jwt'
import SECRET from '../secret'
import Users from '../../../core/components/users/model'
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

export const jwt = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET.secret1,
  ignoreExpiration: true
},
async (jwtPayload, cb) => {
  console.log(jwtPayload)
  const [user] = await Users
    .query()
    .select('*')
    .where('id', jwtPayload.id)
    .where('password', jwtPayload.password)
    .whereNull('deleted_at')
  // delete user.password
  if (user) {
    return cb(null, user)
  } else {
    return cb(null, false)
  }
}
)
