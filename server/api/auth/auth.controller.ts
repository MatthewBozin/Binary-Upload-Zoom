import DiscordOauth2 from 'discord-oauth2';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
  const oauth = new DiscordOauth2();
  let access_token: string;
  try {
    const response = await oauth.tokenRequest({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,

      code: req.body.code,
      scope: 'identify guild',
      grantType: 'authorization_code',

      redirectUri: 'http://localhost:2121/auth-redirect',
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

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '7d' });

  res.cookie('auth-token', token, { httpOnly: true });

  res.sendStatus(200);
};
