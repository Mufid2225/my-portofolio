import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientWrapper from "@/components/ClientWrapper";
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



export const metadata: Metadata = {
  title: {
    default: "Portofolio",
    template: "%s | Portofolio",
  },
  description: "Personal portfolio website",
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
