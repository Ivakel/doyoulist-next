import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
const bcrypt = require("bcrypt");
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
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        const hashedPassword = await bcrypt(password, 10);
        const { user } = await getUser({ email, hashedPassword });

        if (!user) {
          throw new Error("Invalid credentials");
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
