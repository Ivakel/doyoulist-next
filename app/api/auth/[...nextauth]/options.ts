import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";

import { login, register } from "@/db/db";
import { env } from "@/env";
import { GoogleUser } from "@/lib/types";
import redisClient from "@/db/redis/client";

export const options: NextAuthOptions = {
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
        const { email, password, username, action } = credentials;

        if (action === "LOGIN") {
          const { user } = await login({ email, password });

          if (!user) {
            return null;
          }
          return { email: user.email, name: user.username, id: user._id };
        }

        if (action === "REGISTER") {
          const { user } = await register({ username, email, password });

          if (!user) {
            return null;
          }
          return { email: user.email, name: user.username, id: user._id };
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
    async session({ session, token, user }) {
      if (!(session === undefined) && session.user) {
        console.log("user, redis inside");
        if (session.user.email === undefined || session.user.email === null) {
          throw new Error("User email not identified");
        }

        if (session.user.name === undefined || session.user.name === null) {
          throw new Error("Username not identified");
        }
        console.log("user, redis");
        await redisClient.connect();
        await redisClient.hSet(
          session.user.email,
          "session",
          JSON.stringify(session.user)
        );
      }
      await redisClient.quit();
      return session;
    },
  },
};
