import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";

import { google, login, register } from "@/db/db";
import { env } from "@/env";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";

export const options: NextAuthOptions = {
  // adapter: UpstashRedisAdapter(
  //   new Redis({
  //     url: env.UPSTASH_REDIS_REST_URL,
  //     token: env.UPSTASH_REDIS_REST_TOKEN,
  //   })
  // ),

  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
        },
        username: {
          label: "Username:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
        action: {
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password, username: name, action } = credentials;

        if (action === "LOGIN") {
          const { user } = await login({ email, password });

          if (!user) {
            return null;
          }
          return { email: user.email, name: user.name, id: user._id };
        }

        if (action === "REGISTER") {
          const { user } = await register({ name, email, password });

          if (!user) {
            return null;
          }
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        const user = {
          email: profile.email,
          name: profile.name,
          image: profile.image,
        };
        google(user);
      }
      return true;
    },
  },
};

// {
//   iss: 'https://accounts.google.com',
//   azp: '15253463433-6lfhsdhk733oc49bnledl6bjbdbi361d.apps.googleusercontent.com',
//   aud: '15253463433-6lfhsdhk733oc49bnledl6bjbdbi361d.apps.googleusercontent.com',
//   sub: '112249049830379173008',
//   email: 'littleealf44@gmail.com',
//   email_verified: true,
//   at_hash: 'bYaBqtHKHK4z08Xy519GFQ',
//   name: 'The Awakened',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocK1C-yvXfFNfQIxfusVE3lI-XFGYW8TvZlQuc60SonChlV9t5SD=s96-c',
//   given_name: 'The Awakened',
//   iat: 1714909759,
//   exp: 1714913359
// }
