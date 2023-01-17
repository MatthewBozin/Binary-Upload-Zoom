import { MongoClient, ObjectId } from 'mongodb';
import log from './log';

interface Users extends Document {
  discordId: string;
  username: string;
  createdAt: Date;
  id?: ObjectId;
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

  get Users() {
    return this.db.collection<Users>('users');
  }
}

const Db = new Database();

export default Db;


