import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ying Wang",
  description:
    "Thoughts on software engineering, quantitative finance, and building things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased`}
      >
        <div className="mx-auto max-w-2xl px-6">
          <Header />
          <main className="min-h-[60vh] py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
