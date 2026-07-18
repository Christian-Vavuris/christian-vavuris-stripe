import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christian Vavuris — Stripe Candidate",
  description:
    "Christian Vavuris, Account Executive candidate at Stripe. Ask questions and get answers based on his background.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${geist.className}`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
