const path = require('path');
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');

// This file runs the mongoDB server
async function run() {
  const dbString = process.env.DB_STRING || ''
  if (!dbString.includes('localhost') && !dbString.includes('127.0.0.1')) {
    console.log('DB_STRING is not localhost, not running local mongo')
    return
  }
  const dbPath = path.join(__dirname, '../..', '.mongo');

  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
  }

  // start mongo
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbPath,
      // to persist data between runs (https://github.com/nodkz/mongodb-memory-server/issues/524)
      storageEngine: 'wiredTiger',
    },
  });

  const uri = mongod.getUri();
  console.log(`Mongo server started on: ${uri}`);
}

run()