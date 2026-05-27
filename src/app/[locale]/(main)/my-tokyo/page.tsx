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
    <div className="min-h-screen" style={{ background: "#0c0905" }}>
      {/* Fixed vignette — apartment window looking out at Tokyo night */}
      <div className="page-vignette" aria-hidden="true" />
      {/* Apartment tungsten tint — the warmth of where you actually live */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 68% 60% at 50% 40%, rgba(192,108,40,0.07) 0%, rgba(165,82,25,0.03) 55%, transparent 82%)",
          zIndex: 0,
        }}
      />
      <FilmGrain opacity={0.052} className="z-[2] pointer-events-none" />
      <div className="relative z-[3]">
        <MyTokyoContent locale={locale} />
      </div>
    </div>
  );
}
