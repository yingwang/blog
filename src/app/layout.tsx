import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ying Wang blog",
  description:
    "Thoughts on web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="page-content">
          <div className="wrap">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
