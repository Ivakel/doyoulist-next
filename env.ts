import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        REDIS_URL: z.string(),
        REDIS_PASSWORD: z.string().min(1),
        REDIS_PORT: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        MONGO_URI: z.string().url(),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
        OPENAI_API_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_BASE_URL: z.string().url(),
    },
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        REDIS_URL: process.env.REDIS_URL,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        REDIS_PORT: process.env.REDIS_PORT,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        MONGO_URI: process.env.MONGO_URI,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
})
