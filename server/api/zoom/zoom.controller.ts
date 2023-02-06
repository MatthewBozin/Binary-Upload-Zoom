import { RequestHandler } from 'express';
import { KJUR } from 'jsrsasign'; //does not have types
//this has typescript support https://www.npmjs.com/package/jwt-hs256

export const getZoomSignature: RequestHandler = (req, res) => {
  console.log(req.body);
  const initialized = Math.round(new Date().getTime() / 1000) - 30;
  const expires = initialized + 60 * 60 * 2;
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT'});
  const payload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: initialized,
    exp: expires,
    tokenExp: expires,
  };

  const signature = KJUR.jws.JWS.sign('HS256', header, JSON.stringify(payload), process.env.ZOOM_CLIENT_SECRET);

  res.json({ signature: signature });
};
