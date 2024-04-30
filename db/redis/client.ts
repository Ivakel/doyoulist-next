import { env } from "@/env";
import { createClient } from "redis";

const redisClient = createClient({
  password: env.REDIS_PASSWORD,
  socket: {
    host: env.REDIS_URL,
    port: +env.REDIS_PORT,
  },
});
console.log(typeof +env.REDIS_PORT, +env.REDIS_PORT)
// if (!redisClient.isOpen) {
//   redisClient.connect()
// }

export default redisClient;
