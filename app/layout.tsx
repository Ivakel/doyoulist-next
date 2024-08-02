import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Orderdly",
    description: "Generated by create next app",
    icons: {
        icon: ["/favicon.ico"],
        apple: ["/apple-touch-icon.png"],
        shortcut: ["/apple-touch-icon.png"],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body className={inter.className}>{children}</body>
        </html>
    )
}
