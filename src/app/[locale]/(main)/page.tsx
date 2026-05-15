import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAllCities } from "@/lib/cities";
import { getAllMoments, getAllExperiences } from "@/lib/content";
import { communityVoices, lifeCategories, insiderTips } from "@/lib/community";
import { CityCard } from "@/components/cards/CityCard";
import { MomentCard } from "@/components/cards/MomentCard";
import { ExperienceCard } from "@/components/community/ExperienceCard";
import { CommunityVoice } from "@/components/community/CommunityVoice";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { InsiderTip } from "@/components/ui/InsiderTip";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  const cities = getAllCities();
  const experiences = getAllExperiences();
  const moments = getAllMoments().slice(0, 3);
  const voices = communityVoices.slice(0, 3);
  const tips = insiderTips.filter((tip) => tip.city === "all").slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=2000&q=75"
            alt="Foreigners living in Japan"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "saturate(0.5) brightness(0.25)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Kanji watermark */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-light text-[var(--color-sand)]"
            style={{ fontSize: "clamp(12rem, 40vw, 32rem)", opacity: 0.04, lineHeight: 1 }}
          >
            間
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <p className="text-caption text-[var(--color-sand)] mb-6 tracking-[0.25em]">
                {t("hero_label")}
              </p>
            </div>

            <h1
              className="text-display-xl text-[var(--color-parchment)] animate-fade-up delay-100 mb-6"
              style={{ whiteSpace: "pre-line" }}
            >
              {t("hero_title")}
            </h1>

            <p className="text-lg text-[var(--color-sand-light)] max-w-xl leading-relaxed animate-fade-up delay-200 font-light mb-10">
              {t("hero_subtitle")}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button href={`/${locale}/community`} variant="solid">
                {t("cta_experiences")}
              </Button>
              <Button href={`/${locale}/living`} variant="outline">
                {t("cta_cities")}
              </Button>
            </div>
          </div>

          {/* Scroll indicator — bottom center */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ScrollIndicator />
          </div>
        </div>
      </section>

      {/* ── Community voices strip ────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn className="mb-12">
          <p className="text-caption text-[var(--color-sand)] mb-3">
            {t("voices_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("voices_title")}
          </h2>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5"
          staggerDelay={0.1}
        >
          {voices.map((voice, i) => (
            <StaggerItem key={voice.id}>
              <CommunityVoice voice={voice} accent={i === 1} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn className="mt-8" delay={0.2}>
          <Button href={`/${locale}/community`} variant="ghost">
            Read more voices
          </Button>
        </FadeIn>
      </section>

      {/* ── Life categories grid ──────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <FadeIn className="mb-10">
          <p className="text-caption text-[var(--color-sand)] mb-3">
            {t("categories_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("categories_title")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <CategoryGrid categories={lifeCategories} locale={locale} />
        </FadeIn>
      </section>

      {/* ── Experience stories ────────────────────────────────────── */}
      {experiences.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <FadeIn className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-caption text-[var(--color-sand)] mb-3">
                {t("experiences_label")}
              </p>
              <h2 className="text-display-lg text-[var(--color-parchment)]">
                {t("experiences_title")}
              </h2>
            </div>
            <Button href={`/${locale}/community`} variant="ghost">
              All experiences
            </Button>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.12}
          >
            {experiences.slice(0, 3).map((exp) => (
              <StaggerItem key={exp.slug}>
                <ExperienceCard experience={exp} locale={locale} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* ── Cities — reframed as "places to live" ─────────────────── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <FadeIn className="mb-16">
          <p className="text-caption text-[var(--color-sand)] mb-3">
            {t("cities_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("cities_title")}
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl leading-relaxed">
            Each city demands a different version of you. Find out which one fits.
          </p>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.12}
        >
          {cities.map((city) => (
            <StaggerItem key={city.slug}>
              <CityCard city={city} locale={locale} exploreLabel="Living here" />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Insider tips strip ───────────────────────────────────── */}
      {tips.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <FadeIn className="lg:col-span-4">
              <p className="text-caption text-[var(--color-sand)] mb-3">
                {t("tips_label")}
              </p>
              <h2 className="text-display-lg text-[var(--color-parchment)] mb-6">
                {t("tips_title")}
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                The things that took people years to learn, condensed. Contributed by the community.
              </p>
              <Button href={`/${locale}/living`} variant="ghost">
                All insider knowledge
              </Button>
            </FadeIn>

            <StaggerChildren
              className="lg:col-span-8 flex flex-col gap-4"
              staggerDelay={0.12}
            >
              {tips.map((tip) => (
                <StaggerItem key={tip.id}>
                  <InsiderTip
                    tip={tip.tip}
                    context={tip.context}
                    variant="default"
                  />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ── Literary moments ─────────────────────────────────────── */}
      {moments.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <FadeIn className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-caption text-[var(--color-sand)] mb-3">
                Documentary writing
              </p>
              <h2 className="text-display-md font-display font-light text-[var(--color-parchment)]">
                Moments of being there
              </h2>
            </div>
            <Button href={`/${locale}/moments`} variant="ghost">
              {t("moments_cta")}
            </Button>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {moments.map((moment) => (
              <StaggerItem key={moment.slug}>
                <MomentCard
                  moment={moment}
                  locale={locale}
                  readTimeLabel="{min} min read"
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* ── Community CTA ─────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-kyoto-from)] via-[#0a0a12] to-[var(--color-tokyo-from)]" />
        <div className="absolute inset-0 noise" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-caption text-[var(--color-sand)] mb-6 tracking-[0.2em]">
              {t("community_cta_label")}
            </p>
            <h2 className="text-display-lg text-[var(--color-parchment)] mb-4">
              {t("community_cta_title")}
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed mb-10 text-lg">
              {t("community_cta_body")}
            </p>
            <Button href={`/${locale}/about`} variant="outline">
              {t("community_cta_button")}
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
