import { env } from "@/env"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
})

export const addTaskRatelimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(1, "60s"),
})

export default redis
