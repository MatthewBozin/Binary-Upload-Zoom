import { MongoClient } from 'mongodb';

import log from './log';

interface AllowedHost {
  discordId: string;
  username: string;
}

interface Stream {
  arn: string;
  createdBy: string;
}

// Database object modeling mongoDB data
export class Database {
  dbName: string;
  client = new MongoClient(process.env.DB_STRING);

  constructor(dbName = 'virtual-office') {
    this.dbName = dbName;
  }

  // Connect to the mongoDB server
  async connect() {
    await this.client.connect();
    log('Connected to MongoDB! :)');
  }

  get db() {
    return this.client.db(this.dbName);
  }

  // collection name is 'allowed-hosts'
  get AllowedHosts() {
    return this.db.collection<AllowedHost>('allowed-hosts');
  }

  // collection name is 'streams'
  get Streams() {
    return this.db.collection<Stream>('streams');
  }
}

const Db = new Database();

export default Db;
