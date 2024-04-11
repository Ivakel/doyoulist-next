import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

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
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "Iva", password: "nextauth" };

        if (
          credentials?.email === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/register",
  },
};
