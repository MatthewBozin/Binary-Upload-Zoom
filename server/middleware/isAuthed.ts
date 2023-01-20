import { RequestHandler } from 'express';

import { validateToken } from 'server/lib/auth';
import { AUTH_COOKIE_NAME } from 'shared/constants';

// isAuthed(true) returns a request handler that always redirects on bad tokens
// isAuthed(false) returns a request handler that always 401s on bad tokens
// instead of using this middleware as isAuthed, it should be called to generate
// the middleware needed e.g. app.use('/route', isAuthed())
export const isAuthed = (isPage = false): RequestHandler => (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token || !validateToken(token)) {
    if (isPage) {
      res.redirect('/');
    } else {
      res.sendStatus(401);
    }
    return;
  }

  next();
};
