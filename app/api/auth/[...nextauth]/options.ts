import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

import { google, login, register } from "@/db/db"
import { env } from "@/env"

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
                    return null
                }
                const { email, password, username: name, action } = credentials

                if (action === "LOGIN") {
                    const { user } = await login({ email, password })

                    return user
                }

                if (action === "REGISTER") {
                    const { user } = await register({ name, email, password })

                    if (!user) {
                        return null
                    }
                    return user
                }

                return null
            },
        }),
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
        error: "/authentication-error",
    },
    callbacks: {
        async signIn({ profile }) {
            if (profile) {
                const googleUser = {
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                }
                await google(googleUser)
            }
            return true
        },
    },
}
