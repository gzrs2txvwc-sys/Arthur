import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ja")) {
    notFound();
  }

  const messages = await getMessages();
  const nav = (messages as Record<string, Record<string, string>>).nav ?? {};
  const footer =
    (messages as Record<string, Record<string, string>>).footer ?? {};

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen">
        <NavBar
          locale={locale}
          messages={{
            cities: nav.cities ?? "Cities",
            moments: nav.moments ?? "Moments",
            about: nav.about ?? "About",
            language: nav.language ?? "日本語",
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer
          locale={locale}
          messages={{
            tagline: footer.tagline ?? "間 — The pause between things.",
            cities: footer.cities ?? "Cities",
            moments: footer.moments ?? "Moments",
            about: footer.about ?? "About",
            rights: footer.rights ?? "All rights reserved.",
          }}
        />
      </div>
    </NextIntlClientProvider>
  );
}
