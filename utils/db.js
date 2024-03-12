#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor () {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.databaseUrl = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive () {
    return this.connected;
  }

  async nbUsers () {
    return await this.client.db(this.databaseUrl).collection('users').countDocuments();
  }

  async nbFiles () {
    return await this.client.db(this.databaseUrl).collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
