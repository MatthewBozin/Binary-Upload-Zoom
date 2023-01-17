import express from 'express';
import { NextServer } from 'next/dist/server/next';
import { parse } from 'url';
import { Server as HttpServer } from 'http';
import { prepareNextApp } from './lib/next';
import log from './lib/log';
import Db, { Database } from './lib/db';
import apiRouter from './api';

// Express + Next Server object
class Server {
  app = express();
  port = Number(process.env.PORT) || 2121;
  nextApp: NextServer;
  db: Database;
  server: HttpServer;

  setApiRoutes() {
    this.app.use('/api', apiRouter);
  }

  setNextRoutes() {
    const nextHandler = this.nextApp.getRequestHandler();
    this.app.get('*', (req, res) => {
      nextHandler(req, res, parse(req.url, true));
    });
  }

  async init() {
    this.db = Db;
    const results = await Promise.all([ // Wait for everything in promise to be done
      prepareNextApp(),
      this.db.connect(),
    ]);
    this.nextApp = results[0];

    this.setApiRoutes();
    this.setNextRoutes();
  }

  start() {
    return new Promise<void>(resolve => {
      this.server = this.app.listen(this.port, () => {
        log(`Server started on port ${this.port}`);
        resolve();
      });
    });
  }
}

export default Server;
