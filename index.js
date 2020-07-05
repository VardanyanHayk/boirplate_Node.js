import path from 'path';
import 'dotenv/config';
import cors from 'cors';
import engine from 'ejs-mate';
import express from 'express';

import morgan from './src/middleware/morgan';
import router from './src/routes/index';
import './src/middleware/passport/auth';
import logger from './src/lib/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(morgan);
app.use(express.static('public'));
app.use('/', router);

app.use((req, res) => {
  logger.debug('not found');
  res.status(404).send({ message: 'Page not Found' });
});

app.use(async (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || err;

  if (status >= 500) {
    logger.error('app error => %o', err);
  } else {
    logger.debug('app error => %o', err);
  }

  if (
    err.nativeError &&
    (err.nativeError.code === '23505' || err.nativeError.code === '23503')
  ) {
    status = 400;
    message = err.nativeError.detail;
  }
  res.status(status).json({ code: status, message });
});

export default app;
