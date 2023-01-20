import { AsyncRouter } from 'express-async-router';

import authRouter from './auth';
import pageRouter from './page';
import sampleRouter from './sample';

const apiRouter = AsyncRouter();

apiRouter.use(pageRouter);
apiRouter.use('/sample', sampleRouter);
apiRouter.use('/auth', authRouter);

export default apiRouter;
