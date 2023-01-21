import { AsyncRouter } from 'express-async-router';

import { isAuthed } from 'server/middleware/isAuthed';

import { sampleHandler } from './sample.controller';
const sampleRouter = AsyncRouter();

// sample router;
sampleRouter.get('/ping', sampleHandler);
sampleRouter.get('/protected-ping', isAuthed(), sampleHandler);

export default sampleRouter;
