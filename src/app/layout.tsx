import { CartProvider } from "./_context/cartContext";
import { TRPCReactProvider } from "./_trpc/Provider";
import { Inter } from "next/font/google";
import { languages } from "./i18n/settings";
import { cookies } from "next/headers";

import { dir } from "i18next";
import React from "react";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Neonita",
  description: "Neonita - Neon store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayout {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayout) {
  return (
    <html lang={lang} dir={dir(lang ?? "en")}>
      <body className={`font-sans ${inter.variable} dark`}>
        <CartProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </CartProvider>
      </body>
    </html>
  );
}
