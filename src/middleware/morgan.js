import morgan from 'morgan'
import logger from '../lib/logger'

morgan.token('user', req => req.user && `${req.user.firstname} ${req.user.lastname} ${req.user.id}`);

const morganFormat = ':method :url :status :response-time ms :user';
const opts = {
  stream: logger.stream,
};

export default morgan(morganFormat, opts);