import DiscordOauth2 from 'discord-oauth2';
import { RequestHandler } from 'express';
import { BadRequestError } from 'express-response-errors';
import jwt from 'jsonwebtoken';

import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

export const login: RequestHandler<void, void, { code: string }> = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    throw new BadRequestError('Code is required');
  }

  const oauth = new DiscordOauth2();
  let access_token: string;
  try {
    const response = await oauth.tokenRequest({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      code,
      scope: 'identify guild',
      grantType: 'authorization_code',
      redirectUri: process.env.REDIRECT_URI,
    });
    access_token = response.access_token;
  } catch(error) {
    console.log(error.response);
    throw error;
    //todo: handle this error
  }

  const [user] = await Promise.all([
    oauth.getUser(access_token),
    oauth.getUserGuilds(access_token),
  ]);

  // todo: ensure guild matches 100devs guild ID

  const payload: User = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '7d' });

  res.cookie(AUTH_COOKIE_NAME, token);

  res.sendStatus(200);
};
