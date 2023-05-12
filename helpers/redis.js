const Redis = require("ioredis");
let isStarted = false;

function initRedis() {
  if (!isStarted) {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    });
    console.log("Redis started!");
    isStarted = true;
    return redis;
  }
}

function closeRedis() {
  if (isStarted) {
    redis.disconnect();
    console.log("Redis closed!");
    isStarted = false;
  }
}

module.exports = { initRedis, closeRedis };
