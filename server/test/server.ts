import 'dotenv-flow/config';
import { getPortPromise as getPort } from 'portfinder';
import supertest from 'supertest';

import { createUserToken } from 'server/lib/auth';
import { Database } from 'server/lib/db';
import Server from 'server/server';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import { User } from 'shared/user';

class TestServer extends Server {
  loggedInUser: User | null;

  async init(testName = 'default') {
    this.db = new Database(`test-${testName}`);

    await this.db.connect();
    await this.db.db.dropDatabase();
    this.setMiddleware();
    this.setDatabaseOnReq();

    this.app.use((req, res, next) => {
      if (this.loggedInUser) {
        //simulate logged in user by creating a jwt
        const token = createUserToken(this.loggedInUser);
        req.cookies[AUTH_COOKIE_NAME] = token;
      } else {
        //simulate non-logged-in user by making sure there is no jwt
        res.clearCookie(AUTH_COOKIE_NAME);
      }

      next();
    });

    this.setApiRoutes();
    this.setErrorHandler();

    const port = await getPort();
    this.server = this.app.listen(port);
  }

  get exec() {
    return supertest(this.app);
  }

  async destroy() {
    await this.db.client.close();
    return new Promise<void>((resolve) => {
      this.server.close(() => resolve());
    });
  }

  login(user: User) {
    this.loggedInUser = user;
  }

  logout() {
    this.loggedInUser = null;
  }
}

export default TestServer;
