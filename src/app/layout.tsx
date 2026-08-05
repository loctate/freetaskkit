import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreeTaskKit – Free Tools for Everyday Digital Tasks",
    template: "%s | FreeTaskKit",
  },
  description:
    "A collection of free, practical web tools for images, text, business, calculators, documents, and everyday digital tasks.",
  applicationName: "FreeTaskKit",
  keywords: [
    "free online tools",
    "digital tools",
    "image tools",
    "text tools",
    "business tools",
    "online calculators",
  ],
  authors: [{ name: "FreeTaskKit Team" }],
  creator: "FreeTaskKit Team",
  publisher: "FreeTaskKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
