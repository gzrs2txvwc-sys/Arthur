import { getMessages } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

export default async function MainLayout({
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
    <div className="flex flex-col min-h-screen">
      <NavBar
        locale={locale}
        messages={{
          map:       nav.map,
          living:    nav.living,
          cities:    nav.cities,
          stories:   nav.stories,
          community: nav.community,
          about:     nav.about,
          language:  nav.language,
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
