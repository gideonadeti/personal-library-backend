import redisClient from "../config/redis-client";

export async function getCache(key: string) {
  try {
    const data = await redisClient.get(key);

    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error fetching cache:", err);

    return null;
  }
}

export async function setCache(key: string, value: any) {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: 86400 }); // 86400 seconds = 1 day
  } catch (err) {
    console.error("Error setting cache:", err);
  }
}

export async function clearCache(key: string) {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Error clearing cache:", err);
  }
}
