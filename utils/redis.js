import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /**
     * This class used to create a Redis client
     *
     * Methods:
     *  - isAlive: This method is used to check if the redis connection is alive
     *  - get: This method is used to retrieve from the redis database
     *  - set: This method is used to store in the redis database
     *  - del: This method is used to delete from the redis database
     */
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Redis error ${err}`));
  }

  isAlive() {
    this.client.on('connect', () => {
        return true
    });
    return false
  }

  async get(key) {
    try {
      const getAsync = promisify(this.client.get).bind(this.client);
      return getAsync(key);
    } catch (err) {
      console.error(`Error getting key "${key}": ${err}`);
    }
    return null;
  }

  async set(key, value, duration) {
    try {
      this.client.set(key, value, 'EX', duration);
    } catch (err) {
      console.error(`Erro setting "${key}": ${err}`);
    }
  }

  async del(key) {
    try {
      this.client.del(key);
    } catch (err) {
      console.error(`Error deleting "${key}": ${err}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
