import { AsyncRouter } from 'express-async-router';

import authRouter from './auth';
import pageRouter from './page';
import sampleRouter from './sample';
import streamRouter from './stream';
import zoomRouter from './zoom';

const apiRouter = AsyncRouter();

apiRouter.use(pageRouter);
apiRouter.use('/sample', sampleRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/stream', streamRouter);
apiRouter.use('/zoom', zoomRouter);

export default apiRouter;
