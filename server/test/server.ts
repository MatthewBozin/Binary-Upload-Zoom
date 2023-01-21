import 'dotenv-flow/config';
import { getPortPromise as getPort } from 'portfinder';
import supertest from 'supertest';

import { Database } from 'server/lib/db';
import Server from 'server/server';

class TestServer extends Server {
  async init() {
    this.db = new Database('test');

    await this.db.connect();
    this.setMiddleware();
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
}

export default TestServer;
