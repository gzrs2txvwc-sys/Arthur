import { getMessages } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

// Standard pages: NavBar (fixed) + content + Footer
export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const m = messages as Record<string, Record<string, string>>;
  const nav = m.nav ?? {};
  const footer = m.footer ?? {};

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        locale={locale}
        messages={{
          map: nav.map ?? "Map",
          living: nav.living ?? "Living",
          cities: nav.cities ?? "Cities",
          stories: nav.stories ?? "Stories",
          community: nav.community ?? "Community",
          about: nav.about ?? "About",
          language: nav.language ?? "日本語",
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={locale}
        messages={{
          tagline: footer.tagline ?? "間 — Real life in Japan, from the inside.",
          living: footer.living ?? "Living",
          cities: footer.cities ?? "Cities",
          stories: footer.stories ?? "Stories",
          community: footer.community ?? "Community",
          about: footer.about ?? "About",
          rights: footer.rights ?? "All rights reserved.",
        }}
      />
    </div>
  );
}
