import { AsyncRouter } from 'express-async-router'
import { test } from './test.controller'
const testRouter = AsyncRouter()

// sample router;
testRouter.get("/ping", test)

export default testRouter
