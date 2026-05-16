import { getTranslations } from "next-intl/server";
import { lifeCategories, neighborhoods, insiderTips } from "@/lib/community";
import { InsiderTip } from "@/components/ui/InsiderTip";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Living in Japan — Practical insider guide",
  description:
    "The practical guide to actually living in Japan — work, housing, language, daily life, and what nobody warns you about.",
};

const iconMap: Record<string, string> = {
  briefcase: "💼",
  "graduation-cap": "🎓",
  languages: "🗣",
  utensils: "🍜",
  home: "🏠",
  sun: "☀️",
  "map-pin": "📍",
  compass: "🧭",
};

export default async function LivingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("living");
  const tCat = await getTranslations("categories");
  const tN = await getTranslations("neighborhoods");
  const tTip = await getTranslations("tips");

  return (
    <>
      {/* ── Header ─────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-caption text-[var(--color-sand)] mb-4">
            {t("categories_label")}
          </p>
          <h1 className="text-display-xl text-[var(--color-parchment)] mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl leading-relaxed font-light">
            {t("subtitle")}
          </p>
        </FadeIn>
      </section>

      {/* ── Category cards ──────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          staggerDelay={0.08}
        >
          {lifeCategories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <div
                id={cat.slug}
                className="flex gap-5 p-6 border border-white/8 bg-white/[0.02]
                  hover:border-[var(--color-sand)]/20 transition-colors duration-300"
              >
                <span className="text-3xl shrink-0 mt-1">
                  {iconMap[cat.icon] ?? "✦"}
                </span>
                <div>
                  <h2 className="text-lg font-medium text-[var(--color-parchment)] mb-2">
                    {tCat(`${cat.slug as "work"}.label`)}
                  </h2>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4">
                    {tCat(`${cat.slug as "work"}.description`)}
                  </p>
                  <Button
                    href={`/${locale}/community`}
                    variant="ghost"
                    className="!text-xs"
                  >
                    {t("read_experiences")}
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Insider tips ────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <FadeIn className="lg:col-span-3">
            <p className="text-caption text-[var(--color-sand)] mb-3">
              {t("tips_label")}
            </p>
            <h2 className="text-display-md text-[var(--color-parchment)] mb-4">
              {t("tips_title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              {t("tips_desc")}
            </p>
          </FadeIn>

          <StaggerChildren
            className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4"
            staggerDelay={0.07}
          >
            {insiderTips.map((tip) => (
              <StaggerItem key={tip.id}>
                <InsiderTip
                  tip={tTip(`${tip.id as "tip-1"}.tip`)}
                  context={tTip(`${tip.id as "tip-1"}.context`)}
                  variant={tip.city === "all" ? "highlighted" : "default"}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Neighborhoods ───────────────────────────── */}
      <section className="py-16 pb-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <FadeIn className="mb-12">
          <p className="text-caption text-[var(--color-sand)] mb-3">
            {t("neighborhoods_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("neighborhoods_title")}
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl leading-relaxed">
            {t("neighborhoods_desc")}
          </p>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          staggerDelay={0.1}
        >
          {neighborhoods.map((n) => (
            <StaggerItem key={n.slug}>
              <div className="border border-white/8 bg-white/[0.02] p-6 hover:border-[var(--color-sand)]/20 transition-colors duration-300">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-caption text-[var(--color-sand)] mb-1 capitalize">
                      {n.city}
                    </p>
                    <h3 className="text-xl font-display font-light text-[var(--color-parchment)]">
                      {n.name}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] font-japanese mt-0.5">
                      {n.nameJa}
                    </p>
                  </div>
                  <span className="text-caption border border-white/10 px-3 py-1.5 rounded-sm shrink-0">
                    {tN(`${n.slug as "shimokitazawa"}.vibe`)}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-parchment-warm)] leading-relaxed mb-4">
                  {tN(`${n.slug as "shimokitazawa"}.description`)}
                </p>

                <div className="border-t border-white/5 pt-4 mt-4">
                  <p className="text-caption text-[var(--color-sand)] mb-2">{t("insider_tip")}</p>
                  <p className="text-sm text-[var(--color-muted)] italic leading-relaxed">
                    {tN(`${n.slug as "shimokitazawa"}.insiderTip`)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {n.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-widest uppercase
                        px-2 py-1 border border-white/8 text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* City links */}
        <FadeIn className="mt-16">
          <div className="hr-sand mb-10" />
          <p className="text-caption mb-6">{t("explore_by_city")}</p>
          <div className="flex flex-wrap gap-4">
            {(["tokyo", "kyoto", "osaka"] as const).map((city) => (
              <Button key={city} href={`/${locale}/cities/${city}`} variant="outline">
                {t("living_in", { city: city.charAt(0).toUpperCase() + city.slice(1) })}
              </Button>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
