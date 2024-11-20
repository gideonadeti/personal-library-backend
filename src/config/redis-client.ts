import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisClient = createClient({
  password: process.env.REDIS_DB_PASSWORD,
  socket: {
    host: "redis-13889.c13.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 13889,
  },
});

redisClient.on("connect", () => console.log("Connected to Redis DB!"));
redisClient.on("error", (err) => console.error("Error connecting to Redis DB:", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
