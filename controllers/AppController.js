#!/usr/bin/node

const redisClient = require('../utils/redis');
const db = require('../utils/db');

class AppController {
  static getStatus (req, res) {
    if (redisClient.isAlive() && db.isAlive()) {
      res.json({ redis: true, db: true });
    }
  }

  static async getStats (req, res) {
    const users = await db.nbUsers();
    const files = await db.nbFiles();
    res.json({ users, files });
  }
}

module.exports = AppController;
