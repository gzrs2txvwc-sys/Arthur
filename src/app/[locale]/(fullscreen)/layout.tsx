import { getMessages } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";

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
          today:    nav.today,
          map:      nav.map,
          stories:  nav.stories,
          living:   nav.living,
          language: nav.language,
          about:    nav.about,
        }}
      />
      {children}
    </>
  );
}
