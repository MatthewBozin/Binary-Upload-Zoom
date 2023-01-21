import jwt from 'jsonwebtoken';
import setCookie, { Cookie } from 'set-cookie-parser';

import * as authLib from 'server/lib/auth';
import TestServer from 'server/test/server';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

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
      const user: User = {
        id: '123',
        username: 'username',
      };
      // @ts-expect-error User has the fields we need but doesnt satisfy discord user type reqs
      const getInfoSpy = jest.spyOn(authLib, 'getDiscordUserAndGuilds').mockResolvedValueOnce({ user });

      const code = 'some_valid_code';
      const res = await server.exec.post('/api/auth/login')
        .send({ code });

      expect(res.status).toBe(200);

      // ensure the function was called with the code that we sent
      expect(getInfoSpy.mock.calls[0][0] === code);

      const cookies: Cookie[] = res.headers['set-cookie']
        .map(setCookie.parse)
        .map((arr: Cookie[]) => arr[0]);
      const cookie = cookies.find(cookie => cookie.name === AUTH_COOKIE_NAME);

      const cookiePayload = jwt.decode(cookie.value);

      // the cookie payload will contain extra things, so we just
      // want to make sure that it contains the same fields as user
      // using expect.objectContaining
      expect(cookiePayload).toEqual(expect.objectContaining(user));
    });
  });
});
