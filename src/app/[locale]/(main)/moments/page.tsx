import { getTranslations } from "next-intl/server";
import { getAllMoments } from "@/lib/content";
import { MomentCard } from "@/components/cards/MomentCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moments — Stories from Japan",
  description:
    "Literary dispatches from inside Japan. Not guides. Feelings.",
};

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
      {/* ── Header ─────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-caption text-[var(--color-sand)] mb-4">
            {t("all_moments")}
          </p>
          <h1 className="text-display-xl text-[var(--color-parchment)] mb-6">
            {t("page_title")}
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-xl leading-relaxed">
            {t("page_description")}
          </p>
        </FadeIn>
      </section>

      {/* ── Filter strip (city) ─────────────────── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto w-full mb-16">
        <FadeIn>
          <div className="flex flex-wrap gap-3">
            {["all", "tokyo", "kyoto", "osaka"].map((filter) => (
              <span
                key={filter}
                className="text-caption border border-white/10 px-4 py-2 rounded-sm
                  text-[var(--color-muted)] cursor-default capitalize"
              >
                {filter}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Grid ───────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {moments.length > 0 ? (
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
    </>
  );
}
