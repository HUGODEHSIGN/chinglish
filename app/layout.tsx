import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_SC as FontSans } from "next/font/google";

import Navbar from "@/app/components/navbar";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
