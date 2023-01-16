import { AsyncRouter } from 'express-async-router'
import testRouter from './test'

const apiRouter = AsyncRouter()

apiRouter.use('/test', testRouter)

export default apiRouter
