import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

import { getUser } from "@/db/db";
import { env } from "@/env";

type Ty = {
  id: string;
  name: string;
  email: string;
};
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
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
        const { email, password, action } = credentials;

        const { user, error } = await getUser({ email, password, action });
        console.log("below getUser");
        console.log(user);

        if (!user) {
          throw new Error(error?.message);
        }
        return { id: user?.id, name: user?.name, email: user?.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};
