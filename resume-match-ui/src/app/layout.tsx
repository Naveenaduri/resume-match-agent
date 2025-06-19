import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import ChakraProviders from "../components/ChakraProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Match Agent",
  description: "AI-powered resume-job matching and cold email generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen bg-gray-50">
        <ChakraProviders>
          <Navbar />
          {children}
        </ChakraProviders>
      </body>
    </html>
  );
}
