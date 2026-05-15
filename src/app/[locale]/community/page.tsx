import { getTranslations } from "next-intl/server";
import { communityVoices, insiderTips } from "@/lib/community";
import { getAllExperiences } from "@/lib/content";
import { CommunityVoice } from "@/components/community/CommunityVoice";
import { ExperienceCard } from "@/components/community/ExperienceCard";
import { InsiderTip } from "@/components/ui/InsiderTip";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — Foreigners living in Japan",
  description:
    "Real voices from foreigners living in Japan. Their stories, their knowledge, their honest experiences.",
};

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("community");

  const experiences = getAllExperiences();

  return (
    <>
      {/* ── Header ──────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-caption text-[var(--color-sand)] mb-4">
            {t("voices_label")}
          </p>
          <h1 className="text-display-xl text-[var(--color-parchment)] mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl leading-relaxed font-light">
            {t("subtitle")}
          </p>
        </FadeIn>
      </section>

      {/* ── All community voices ───────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5"
          staggerDelay={0.08}
        >
          {communityVoices.map((voice) => (
            <StaggerItem key={voice.id}>
              <CommunityVoice voice={voice} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Experience stories ──────────────────────── */}
      {experiences.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <FadeIn className="mb-12">
            <p className="text-caption text-[var(--color-sand)] mb-3">
              {t("experiences_label")}
            </p>
            <h2 className="text-display-lg text-[var(--color-parchment)]">
              Long-form stories
            </h2>
            <p className="text-[var(--color-muted)] mt-4 max-w-xl leading-relaxed">
              First-person accounts of what it actually looks like to build a life in Japan.
            </p>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.12}
          >
            {experiences.map((exp) => (
              <StaggerItem key={exp.slug}>
                <ExperienceCard experience={exp} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* ── Insider tips ────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <FadeIn className="mb-12">
          <p className="text-caption text-[var(--color-sand)] mb-3">
            {t("tips_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            Collective knowledge
          </h2>
        </FadeIn>

        <StaggerChildren className="flex flex-col gap-4 max-w-3xl" staggerDelay={0.07}>
          {insiderTips.map((tip) => (
            <StaggerItem key={tip.id}>
              <InsiderTip
                tip={tip.tip}
                context={tip.context}
                variant={tip.city === "all" ? "highlighted" : "default"}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Share CTA ───────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-osaka-from)] to-[var(--color-ink)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-display-md text-[var(--color-parchment)] mb-4">
              Lived in Japan?
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-10">
              This platform grows through honest stories. If you have a year or more of Japan life behind you, we want to hear about it.
            </p>
            <Button href={`/${locale}/about`} variant="outline">
              Share your experience
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
