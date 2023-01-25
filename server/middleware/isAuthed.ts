import { RequestHandler } from 'express';
import { ForbiddenError, UnauthorizedError } from 'express-response-errors';
import jwt from 'jsonwebtoken';

import { validateToken } from 'server/lib/auth';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

// isAuthed(true) returns a request handler that always redirects on bad tokens
// isAuthed(false) returns a request handler that always 401s on bad tokens
// instead of using this middleware as isAuthed, it should be called to generate
// the middleware needed e.g. app.use('/route', isAuthed())
export const isAuthed = (isPage = false): RequestHandler => (req, res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token || !validateToken(token)) {
    if (isPage) {
      res.redirect('/');
      return;
    } else {
      throw new UnauthorizedError('You must be logged in to access this resource');
    }
  }

  const user = jwt.decode(token) as User;
  req.user = user;

  next();
};

//middleware for creating and deleting streams
//checks if user's id is in list of allowed host ids in database
export const isHost = (isPage = false): RequestHandler => async (req, res, next) => {
  const user = req.user;

  const found = await req.db.AllowedHosts.findOne({
    discordId: user?.id,
  });

  if (!found) {
    if (isPage) {
      res.redirect('/');
      return;
    } else {
      throw new ForbiddenError('Only hosts can access this resource');
    }
  }

  next();
};
