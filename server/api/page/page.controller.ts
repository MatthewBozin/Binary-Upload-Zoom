import { RequestHandler } from 'express';

export const login: RequestHandler = (req, res) => {
  const redirectUri = 'http://localhost:2121/auth-redirect';
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'identify guilds');
  params.append('client_id', process.env.DISCORD_CLIENT_ID);
  const url = 'https://discord.com/oauth2/authorize?' + params.toString();
  res.redirect(url);
};
