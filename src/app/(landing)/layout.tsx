import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import Navbar from "@/app/_components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neonita",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed top-0 w-full min-h-screen -z-50 bg-gradient-to-b from-black to-stone-900" />
      <div className="min-h-screen text-white dark">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
