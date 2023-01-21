import { RequestHandler } from 'express';

export const login: RequestHandler = (req, res) => {
  const redirectUri = 'http://localhost:2121/auth-redirect';
  const url = `https://discord.com/oauth2/authorize?response_type=code&redirect_uri=${redirectUri}&scope=identify%20guilds&client_id=${process.env.DISCORD_CLIENT_ID}`;
  res.redirect(url);
};
