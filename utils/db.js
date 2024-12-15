import MongoClient from 'mongodb/lib/mongo_client';

class DBClient {
  /**
     * This Class is used to manage the Mongo Database
     *
     * Methods:
     *  - isAlive: This method is used to check if the database is connected
     *  - nbUsers: This method is used to return the number of documents contained
     *             in the users collection
     *  - nbFiles: This method is used to return the number of documents contained
     *             in the files collection
     */
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.uri);
  }

  isAlive() {
    try {
      if (!this.client.topology || !this.client.topology.isConnected()) {
        this.client.connect();
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    try {
      const db = this.client.db(this.database);
      return db.users.count();
    } catch (err) {
      return (0);
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db(this.database);
      return db.files.count();
    } catch (err) {
      return (0);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
