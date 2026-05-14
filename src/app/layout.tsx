import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Noto_Serif_JP } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — MA (間)",
    default: "MA (間) — Japan Lifestyle Platform",
  },
  description:
    "Cinematic stories from the emotional geography of Japan. Not a travel guide. A feeling.",
  keywords: ["Japan", "lifestyle", "culture", "Tokyo", "Kyoto", "Osaka"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MA (間)",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${cormorant.variable}
        ${notoSerifJP.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
