import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        REDIS_URL: z.string(),
        REDIS_PASSWORD: z.string().min(1),
        REDIS_PORT: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        SUPABASE_URL: z.string().url(),
        SUPABASE_ANON_KEY: z.string(),
        MONGO_URI: z.string().url(),
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
        OPENAI_API_KEY: z.string().min(1),
        BASE_URL: z.string().url(),
    },
    client: {},
    // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
    runtimeEnv: {
        REDIS_URL: process.env.REDIS_URL,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        REDIS_PORT: process.env.REDIS_PORT,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        MONGO_URI: process.env.MONGO_URI,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        BASE_URL: process.env.BASE_URL,
    },
})
