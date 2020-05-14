import Users from '../../../core/components/users/model'
import passwordHash from 'password-hash'
import Local from 'passport-local'

//  user
export const Login = new Local.Strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},

async function (req, email, password, done) {
  const [user] = await Users
      .query()
      .where('email', email)
  if (user &&
      passwordHash.verify(password, user.password)) {
    if (!user.deleted_at) {
      return done(null, user, { code: 200, message: 'ok' })
    } else {
      return done(null, null, { code: 400, message: 'User was deleted' })
    }
  } else if (!user) {
    return done(null, null, { code: 400, message: 'Wrong email' })
  } else if (!passwordHash.verify(password, user.password)) {
    return done(null, null, { code: 400, message: 'Wrong password' })
  }
})
