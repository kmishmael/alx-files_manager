import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected: ${error.message}`)
    })
    this.client.on('connect', () => {
      console.log('Redis client connected')
    })
  }
}