import express from 'express'
import getSampleRoutes from './sample'


function getRouter() {
  const router = express.Router()
  // router.use('/auth', getAuthRouter())
  // router.use('/list-items', getListItemsRoutes())
  router.use('/sample', getSampleRoutes())

  return router
}

export default getRouter
