import { getMessages } from "next-intl/server";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { getTokyoWeather } from "@/lib/weather";
import { computeAtmosphere, tokyoHour } from "@/lib/atmosphere";

export const revalidate = 1800; // re-render every 30 min to shift atmosphere

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

  // Atmospheric tint — fetched server-side, cached for 30 min
  const weather = await getTokyoWeather();
  const hour = tokyoHour();
  const atm = computeAtmosphere(hour, weather.condition, weather.feeling);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-page atmospheric tint overlay — pointer-events-none so it never blocks clicks */}
      {atm.tintColor && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            background: atm.tintColor,
            opacity: atm.tintOpacity,
            pointerEvents: "none",
            transition: "opacity 2s ease, background 2s ease",
          }}
        />
      )}
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
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
