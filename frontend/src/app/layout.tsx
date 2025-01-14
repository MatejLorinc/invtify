import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import {UserProvider} from "@auth0/nextjs-auth0/client";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Invtify - Automated Investing",
    description: "Effortless automated investing with your own fully customizable strategy",
    icons: {
        icon: "/assets/icon.ico"
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <UserProvider>
            <body className={inter.className}>{children}</body>
        </UserProvider>
        </html>
    );
}
