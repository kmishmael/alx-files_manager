#!/usr/bin/node

const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor () {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client Error: ${error.message}`);
    });
    this.client.on('connect', () => {
      console.log('Redis client connected');
    });
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return await getAsync(key);
  }

  async set (key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value, 'EX', duration);
  }

  async del (key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
