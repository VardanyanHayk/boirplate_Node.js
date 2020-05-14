import { logger } from '../lib/logger'

function log () {
  return [
    (req, res, next) => {
      try {
        logger.debug('%s, %s, %o', `${req.user.role} ${req.user.firstname}, ${req.user.lastname}`, req.method, req.body)
        next()
      } catch (e) {
        console.log(e)
        next(e)
      }
    }
  ]
}

export default log
