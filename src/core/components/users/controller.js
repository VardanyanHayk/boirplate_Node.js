import Users from './model'
import refreshToken from '../refreshToken/controller'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import  nconf from '../../../../config'
import { unlink } from '../../../middleware/multer'
import passwordHash from 'password-hash'
import { response } from '../../../utils/index'
import { forgotPass } from '../../../lib/nodeMailer'

const secret = nconf.get('jwt:secret')
class User {

  async create (req, res, next) {
    try {
      const { firstname, lastname, email, password, role } = req.body.data
      // if (!roles.filter(it => it === role)[0])
      //   return response(res, 400, 'Undefined role')
      const data = {
        firstname,
        lastname,
        email,
        password: passwordHash.generate(password),
        role: role || 'user'
      }
      const user = await Users
        .query()
        .insertAndFetch(data)
      response(res, 200, 'Ok', user)
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.user
      const { data } = req.body
      if (data.oldPassword && data.newPassword) {
        const newPassword = passwordHash.generate(data.newPassword)
        const [user] = await Users
          .query()
          .where('id', id)
        if (!passwordHash.verify(data.oldPassword, user.password)) {
          return response(res, 400, 'Wrong password!')
        }
        const [updated] = await Users
          .query()
          .patch({ password: newPassword, updated_at: new Date() })
          .where('id', id)
          .returning('*')
        const jwtData = { id: updated.id, password: updated.password, exp: Math.floor(Date.now() / 1000) + 60 }
        const authToken = jwt.sign(JSON.stringify(jwtData), secret)
        const refresh = await refreshToken.create(jwtData)
        return response(res, 200, 'Password successfully changed', { authToken, refreshToken: refresh })
      }
      data.updated_at = new Date()
      const [user] = await Users
        .query()
        .patch(data)
        .where('id', id)
        .returning('*')
      response(res, 200, 'Ok', user)
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      // if () return response(res, 419, 'Chaynik')
      const [user] = await Users
        .query()
        .patch({ deleted_at: new Date() })
        .whereNotIn('role', ['admin'])
        .where('id', id)
        .returning('*')
      if (!user) return response(res, 400, 'Bad request')
      response(res, 200, 'User was deleted', user)
    } catch (err) {
      next(err)
    }
  }

  login (req, res, next) {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err) {
        return res.send(err)
      }
      if (!user) {
        return response(res, 400, info.message)
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          res.send(err)
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const jwtData = { id: user.id, password: user.password, exp: Math.floor(Date.now() / 1000) + 60 }
        const authToken = jwt.sign(JSON.stringify(jwtData), jwt.secret)
        const refresh = await refreshToken.create(jwtData)
        return response(res, 200, 'ok', { authToken, refreshToken: refresh, role: user.role })
      })
    })(req, res, next)
  }

  async data (req, res, next) {
    try {
      const [data] = await Users
        .query()
        .select()
        .omit('password')
        .where('id', req.user.id)
      response(res, 200, 'Ok', data)
    } catch (err) {
      next(err)
    }
  }

  async refreshToken (req, res, next) {
    try {
      const { token } = req.body.data
      const data = await refreshToken.refresh(token)
      if (data.err) return response(res, 401, 'Unauthorized')
      response(res, 200, 'Ok', data)
    } catch (err) {
      next(err)
    }
  }

  async forgotPassword (req, res, next) {
    try {
      const { email } = req.body.data
      const [user] = await Users
        .query()
        .where('email', email)
        .whereNull('deleted_at')
      if (!user) return response(res, 400, 'Wrong email')
      const jwtData = { id: user.id, type: 'password', exp: Math.floor(Date.now() / 1000) + 60 * 15 }
      const token = jwt.sign(JSON.stringify(jwtData), secret.secret1)
      forgotPass(email, token)
      response(res, 200, 'We send recovery message to your mail')
    } catch (err) {
      next(err)
    }
  }

  async updateForgotPassword (req, res, next) {
    try {
      const { token, password } = req.body.data
      const decoded = jwt.verify(token, secret.secret1);
      if (decoded.type !== 'password') return response(res, 400, 'Bad request')
      const [updated] = await Users
        .query()
        .patch({ 
          password: passwordHash.generate(password),
          updated_at: new Date()
        })
        .where('id', decoded.id)
        .returning('*')
      const jwtData = { id: updated.id, password: updated.password, exp: Math.floor(Date.now() / 1000) + 60 }
      const authToken = jwt.sign(JSON.stringify(jwtData), secret.secret1)
      const refresh = await refreshToken.create(jwtData)
      response(res, 200, 'Password successfully changed', { authToken, refreshToken: refresh })
    } catch (err) {
      console.log(err)
      if (err.name = 'TokenExpiredError') return response(res, 400, 'Time out')
      next(err)
    }
  }

  async uploadImage (req, res, next) {
    try {
      const { id } = req.user
      const image = req.files[0]
      console.log('>>>>>', image)
      if (!image) return response(res, 400, 'Bad request')
      const [user] = await Users
        .query()
        .where('id', id)
      if (user[image.fieldname]) unlink(`public${user[image.fieldname]}`)
      const [update] = await Users
        .query()
        .patch({
          [image.fieldname]: image.path.split('public')[1],
          updated_at: new Date()
        })
        .returning('*')
      response(res, 200, 'Image was uploaded', update)
    } catch (err) {
      next(err)
    }
  }

  async logout (req, res, next) {
    try {
      await req.logout()
      response(res, 200, 'Logout')
    } catch (err) {
      next(err)
    }
  }

}

const user = new User()

export default user
