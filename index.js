import express from 'express'
import 'dotenv/config'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './src/routes/index'
import './src/middleware/passport/auth'
import logger from './src/lib/logger'
import { Socket } from './src/lib/socket.io';

const app = express()
const server = http.createServer(app)
Socket(server);

const { port } = process.env
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(cors())
app.use(morgan('combined'))
app.use(express.static('public'))
app.use('/', router)
app.use(function error404 (req, res) {
  logger.error(err)
  res.status(404).send({ message: 'Page not Found' })
})
app.use(async function error500 (err, req, res, next) {
  logger.error(err)
  console.log(err)
  if (err.nativeError && err.nativeError.code === '23505') 
    res.status(400).send({ code: 400, message: err.nativeError.detail })
  if (err.nativeError && err.nativeError.code === '23503') 
    res.status(400).send({ code: 400, message: err.nativeError.detail })

  res.status(500).send({ code: 500, message: 'Page not Found', err })
})
server.listen(port, () => { console.log(`API started ${port}`) })