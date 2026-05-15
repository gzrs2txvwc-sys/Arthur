import { getMessages } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";

// Full-screen pages (map): NavBar only, no footer, no scroll wrapper
export default async function FullscreenLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const nav = (messages as Record<string, Record<string, string>>).nav ?? {};

  return (
    <>
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
      {children}
    </>
  );
}
