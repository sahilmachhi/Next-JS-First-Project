import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "First Next JS Project",
  description: "Created by Sahil M.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-[4rem]">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
