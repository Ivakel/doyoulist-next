import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

import { login, register } from "@/db/db";
import { env } from "@/env";

type Ty = {
  id: string;
  name: string;
  email: string;
};
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
        console.log("auth in progress...");
        const { email, password, username, action } = credentials;

        if (action === "LOGIN") {
          const { user } = await login({ email, password });
          console.log(user, 2);
          if (!user) {
            return null;
          }
          return { ...user };
        }

        if (action === "REGISTER") {
          const { user } = await register({ username, email, password });
          console.log(user, 1, typeof user?._id);
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
};
