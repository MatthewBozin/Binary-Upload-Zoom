import { AsyncRouter } from 'express-async-router';

import { isAuthed } from 'server/middleware/isAuthed';

import { getZoomSignature } from './zoom.controller';
const zoomRouter = AsyncRouter();

// zoom router;
zoomRouter.post('/', isAuthed(), getZoomSignature);

export default zoomRouter;
