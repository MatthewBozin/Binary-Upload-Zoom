import { AsyncRouter } from 'express-async-router';

import { isAuthed, isHost } from 'server/middleware/isAuthed';
import { validateMongoObjectId } from 'server/middleware/validateMongoObjectId';

import { postStream, getStream, deleteStream } from './stream.controller';
const streamRouter = AsyncRouter();
//applies isAuthed() to all routes
streamRouter.use(isAuthed());

// just / is more restful because endpoint will look like: POST /api/stream/
// (which is descriptive enough)
streamRouter.post('/', isHost(), postStream);
streamRouter.get('/:id', validateMongoObjectId('params', 'id'), getStream);
streamRouter.delete('/:id', validateMongoObjectId('params', 'id'), isHost(), deleteStream);

export default streamRouter;
