import express from 'express'

function getSampleRoutes() {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
  })

  return router
}

export default getSampleRoutes
