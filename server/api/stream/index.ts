import { AsyncRouter } from 'express-async-router';

import { isAuthed, isHost } from 'server/middleware/isAuthed';

import { postStream, getStream, deleteStream } from './stream.controller';
const streamRouter = AsyncRouter();
//applies isAuthed() to all routes
streamRouter.use(isAuthed());

// just / is more restful because endpoint will look like: POST /api/stream/
// (which is descriptive enough)
streamRouter.post('/', isHost(), postStream);
streamRouter.get('/:id', getStream);
streamRouter.delete('/', isHost(), deleteStream);

export default streamRouter;
