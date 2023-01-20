import jwt from 'jsonwebtoken';

export function validateToken(token: string) {
  let valid;
  try {
    valid = !!jwt.verify(token, process.env.AUTH_SECRET);
  } catch (err) {
    valid = false;
  }

  return valid;
}
