import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import hpp from 'hpp'
import logger from 'loglevel'
import passport from 'passport'
import getRouter from './routes'
// import { getLocalStrategy } from './utils/auth'
import errorMiddleware from './utils/error-middleware'

function startServer({ port = process.env.PORT } = {}) {
  const app = express()
  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json())
  app.use(hpp())
  app.use(passport.initialize())
  // passport.use(getLocalStrategy())

  const router = getRouter()
  app.use('/api', router)
  app.use(errorMiddleware)

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`)
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose)
        })
      }
      resolve(server)
    })
  })
}

export default startServer
