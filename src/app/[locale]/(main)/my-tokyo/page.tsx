import { FilmGrain } from "@/components/ui/FilmGrain";
import { MyTokyoContent } from "@/components/my-tokyo/MyTokyoContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tokyo",
  description: "Your Tokyo — built from the neighborhoods you've found.",
};

export default async function MyTokyoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <FilmGrain opacity={0.038} className="z-0 pointer-events-none" />
      <MyTokyoContent locale={locale} />
    </div>
  );
}
