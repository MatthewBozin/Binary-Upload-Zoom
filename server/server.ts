import express, { Express } from 'express';
import { NextServer } from 'next/dist/server/next';
import { parse } from 'url';
import { prepareNextApp } from './lib/next';
import log from './lib/log';
import Db from './lib/db';
import apiRouter from './api';

// Express + Next Server object
class Server {
  app: Express;
  port: number;
  nextApp: NextServer;

  async init() {
    this.app = express();
    this.port = Number(process.env.PORT) || 2121;
    const results = await Promise.all([ // Wait for everything in promise to be done
      prepareNextApp(),
      Db.connect(),
    ]);
    this.nextApp = results[0];
    this.setRoutes();
  }

  setRoutes() {
    this.app.use('/api', apiRouter);

    const nextHandler = this.nextApp.getRequestHandler();
    this.app.get('*', (req, res) => {
      nextHandler(req, res, parse(req.url, true));
    });
  }

  start() {
    this.app.listen(this.port, () => {
      log(`Server started on port ${this.port}`);
    });
  }
}

export default Server;
