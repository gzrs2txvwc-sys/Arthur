import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Noto_Serif_JP } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { PWAInit } from "@/components/PWAInit";
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

export const viewport: Viewport = {
  themeColor: "#100c07",
  viewportFit: "cover",
  colorScheme: "dark",
};

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  ja: "ja_JP",
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
  ko: "ko_KR",
  vi: "vi_VN",
  id: "id_ID",
  th: "th_TH",
  es: "es_ES",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: {
      template: "%s — Arthur",
      default: "Arthur — Tonight in Tokyo",
    },
    description:
      "A nightly companion for living in Tokyo.",
    keywords: ["Tokyo", "Japan", "lifestyle", "tonight", "walks", "companion"],
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] ?? "en_US",
      siteName: "Arthur",
    },
    appleWebApp: {
      capable: true,
      title: "Arthur",
      statusBarStyle: "black-translucent",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`
        ${inter.variable}
        ${cormorant.variable}
        ${notoSerifJP.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="min-h-screen">
        <PWAInit />
        {children}
      </body>
    </html>
  );
}
