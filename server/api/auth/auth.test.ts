import jwt from 'jsonwebtoken';

import TestServer from 'server/test/server';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

const user: User = {
  id: '123',
  username: 'username',
};

jest.mock('discord-oauth2', () => {
  return jest.fn().mockImplementation(() => {
    return {
      tokenRequest: jest.fn().mockImplementation(async () => ({ access_token: 'abc' })),
      getUser: jest.fn().mockImplementation(async () => user),
      getUserGuilds: jest.fn().mockImplementation(async () => 'todo'),
    };
  });
});

describe('auth router', () => {
  let server: TestServer;

  beforeAll(async () => {
    server = new TestServer();
    await server.init();
  });

  afterAll(async () => {
    await server.destroy();
  });

  describe('POST /login', () => {
    it('should error if no code was provided', async () => {
      const res = await server.exec.post('/api/auth/login')
        .send({ code: '' });
      expect(res.status).toBe(400);
    });

    it('should sign a token and set a cookie', async () => {
      const res = await server.exec.post('/api/auth/login')
        .send({ code: 'some_fake_code' });
      expect(res.status).toBe(200);

      const cookie = res.headers['set-cookie'][0].split(';')[0];
      const [cookieName, ...rest] = cookie.split('=');
      // the cookie value might have an `=` in it, so combine the rest
      const cookieValue = rest.join('=');

      const cookiePayload = jwt.decode(cookieValue);

      expect(cookieName).toBe(AUTH_COOKIE_NAME);
      // the cookie payload will contain extra things, so we just
      // want to make sure that it contains the same fields as user
      // using expect.objectContaining
      expect(cookiePayload).toEqual(expect.objectContaining(user));
    });
  });
});
