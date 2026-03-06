import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "Blitz Skills - Hackathon Skills Marketplace",
  description:
    "Find your perfect hackathon team. Post your skills, discover talented builders, and form the ultimate team at Blitz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <TooltipProvider>
          <div className="flex h-screen flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
