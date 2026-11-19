import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});



const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Mufid Arhaburrizky — Portfolio",
    template: "%s | Mufid // Portfolio",
  },
  description:
    "Portfolio pribadi Muhammad Mufid Arhaburrizky — Frontend Developer yang mengeksplorasi web modern (Next.js, React, TypeScript) dan Artificial Intelligence.",
  keywords: [
    "Muhammad Mufid Arhaburrizky",
    "Mufid",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Mufid Arhaburrizky", url: "https://github.com/Mufid2225" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    title: "Muhammad Mufid Arhaburrizky — Portfolio",
    description:
      "Frontend Developer yang mengeksplorasi web modern (Next.js, React, TypeScript) dan Artificial Intelligence.",
    siteName: "Mufid // Portfolio",
    images: [{ url: "/profile/avatar.webp", alt: "Muhammad Mufid Arhaburrizky" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mufid Arhaburrizky — Portfolio",
    description:
      "Frontend Developer yang mengeksplorasi web modern (Next.js, React, TypeScript) dan Artificial Intelligence.",
    images: ["/profile/avatar.webp"],
  },
  icons: {
    icon: "/icons/logo_porto.png",
    shortcut: "/icons/logo_porto.png",
    apple: "/icons/logo_porto.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ClientWrapper>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
