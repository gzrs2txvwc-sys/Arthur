import { Suspense } from "react";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { ShareCardTool } from "@/components/share-card/ShareCardTool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memory Card · 記憶カード",
  description: "Create a shareable memory card from your Tokyo moments.",
};

export default async function ShareCardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen" style={{ background: "#0d0905" }}>
      <div className="page-vignette" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(165,82,12,0.08) 0%, rgba(100,58,8,0.03) 52%, transparent 78%)",
          zIndex: 0,
        }}
      />
      <FilmGrain opacity={0.048} className="z-[2] pointer-events-none" />
      <div className="relative z-[3]">
        <Suspense fallback={null}>
          <ShareCardTool locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
