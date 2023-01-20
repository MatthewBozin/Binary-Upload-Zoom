import DiscordOauth2 from 'discord-oauth2';
import { RequestHandler } from 'express';

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
    console.log(error);
    throw error;
    //todo: handle this error
  }

  const [user, guild] = await Promise.all([
    oauth.getUser(access_token),
    oauth.getUserGuilds(access_token),
  ]);
  res.json({ message: 'aaaaa' });
};
