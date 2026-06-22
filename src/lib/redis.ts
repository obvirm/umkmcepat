import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      // Stop retrying after 3 attempts if redis is down
      if (times > 3) {
        return null;
      }
      return Math.min(times * 50, 2000);
    },
  });

redis.on("error", (err) => {
  console.warn("Redis connection warning (Cache disabled):", err.message);
});

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}
