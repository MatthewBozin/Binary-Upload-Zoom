import { Database } from 'server/lib/db';
import { User } from 'shared/user';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
      db: Database;
    }
  }
}
