import { AsyncRouter } from 'express-async-router';

import { isAuthed, isHost } from 'server/middleware/isAuthed';

import { postStream, deleteStream, getActiveStream } from './stream.controller';
const streamRouter = AsyncRouter();
//applies isAuthed() to all routes
streamRouter.use(isAuthed());

// just / is more restful because endpoint will look like: POST /api/stream/
// (which is descriptive enough)
// streamRouter.post('/', isHost(), postStream);
streamRouter.post('/', postStream);
streamRouter.get('/', getActiveStream);
streamRouter.delete('/', isHost(), deleteStream);

//TODO: get stream for current host, so host can jump back into their stream
//TODO: provide playbackurl for currently playing stream

export default streamRouter;
