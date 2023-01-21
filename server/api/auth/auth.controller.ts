import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { getDiscordUserAndGuilds } from 'server/lib/auth';
import log from 'server/lib/log';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

export const login: RequestHandler<void, void, { code: string }> = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    res.sendStatus(400);
    return;
  }

  let user: User;
  try {
    const info = await getDiscordUserAndGuilds(code);
    user = info.user;
  } catch (err) {
    log('Errored when attempting to use discord OAuth', err);
    return res.sendStatus(500);
  }

  // todo: ensure guild matches 100devs guild ID

  const payload: User = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '7d' });

  res.cookie(AUTH_COOKIE_NAME, token);

  res.sendStatus(200);
};
