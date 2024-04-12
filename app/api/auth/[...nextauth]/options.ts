import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
const bcrypt = require("bcrypt");
import { getUser } from "@/db/db";

const getGoogleClientId = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Google client ID not found");
  }

  return clientId;
};
const getGoogleClientSecret = () => {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("Google client secret not found");
  }

  return clientSecret;
};

type Ty = {
  id: string;
  name: string;
  email: string;
};
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getGoogleClientId(),
      clientSecret: getGoogleClientSecret(),
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
    signIn: "/register",
  },
};
