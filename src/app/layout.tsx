import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Cobrança Construbom",
  description: "Assistente de cobranças da loja — fichas, agenda e mensagens prontas.",
};

export const viewport: Viewport = {
  themeColor: "#0A4C9E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-4 md:pb-10">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
