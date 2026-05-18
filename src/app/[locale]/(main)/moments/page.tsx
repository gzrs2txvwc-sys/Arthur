import { getTranslations } from "next-intl/server";
import { getAllMoments } from "@/lib/content";
import { MomentCard } from "@/components/cards/MomentCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { WorldBridge } from "@/components/ui/WorldBridge";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "moments" });
  return {
    title: t("page_title"),
    description: t("page_description"),
  };
}

export default async function MomentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("moments");
  const moments = getAllMoments(locale);

  return (
    <>
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      {/* ── Cinematic header ───────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(260px, 42vh, 480px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75"
          alt="Stories from Tokyo"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.22) brightness(0.24) contrast(1.14) sepia(0.3)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(48, 32, 12, 0.22)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 100%, transparent), color-mix(in srgb, var(--color-ink) 25%, transparent), transparent)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12">
          <span
            className="font-mono block mb-4"
            style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#C9A96E", opacity: 0.5 }}
          >
            III · STORIES & MEMORIES
          </span>
          <h1
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--color-parchment)" }}
          >
            {t("page_title")}
          </h1>
        </div>
      </div>

      {/* ── Intro ──────────────────────────────── */}
      <section className="pt-12 pb-10 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <FadeIn>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--color-muted)", opacity: 0.6 }}>
            {t("page_description")}
          </p>
        </FadeIn>
      </section>

      {/* ── Filter strip (city) ─────────────────── */}
      <section className="px-6 lg:px-12 max-w-4xl mx-auto w-full mb-12">
        <FadeIn>
          <div className="flex flex-wrap gap-3">
            <span
              className="text-caption border border-white/10 px-4 py-2 rounded-sm
                text-[var(--color-muted)] cursor-default"
            >
              {t("filter_all")}
            </span>
            {(["tokyo", "kyoto", "osaka"] as const).map((city) => (
              <span
                key={city}
                className="text-caption border border-white/10 px-4 py-2 rounded-sm
                  text-[var(--color-muted)] cursor-default capitalize"
              >
                {city}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Grid ───────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        {moments.length > 0 ? (
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            staggerDelay={0.1}
          >
            {moments.map((moment) => (
              <StaggerItem key={moment.slug}>
                <MomentCard
                  moment={moment}
                  locale={locale}
                  readTimeLabel={t("read_time")}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <FadeIn>
            <p className="text-[var(--color-muted)] text-lg py-24 text-center">
              {t("coming_soon")}
            </p>
          </FadeIn>
        )}
      </section>

      {/* ── World bridge ─────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-4xl mx-auto w-full pb-20">
        <WorldBridge exclude="stories" locale={locale} />
      </section>
    </>
  );
}
