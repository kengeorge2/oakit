import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OAK IT Solutions | IT Services & Digital Transformation",
  description: "Providing cutting-edge IT solutions, POS systems, web development, and digital transformation services globally.",
  keywords: ["IT solutions", "POS systems", "web development", "digital transformation", "Uganda", "software products", "ClassicPOS", "QuizApp"],
  openGraph: {
    title: "OAK IT Solutions",
    description: "IT Solutions and Services Globally",
    url: "https://oakitsolutionsandsupplies.com",
    siteName: "OAK IT Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
