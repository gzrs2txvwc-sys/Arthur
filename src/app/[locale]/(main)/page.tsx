import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAllCities } from "@/lib/cities";
import { getAllMoments, getAllExperiences } from "@/lib/content";
import { communityVoices, survivalTruths } from "@/lib/community";
import { worlds } from "@/lib/worlds";
import { CityCard } from "@/components/cards/CityCard";
import { MomentCard } from "@/components/cards/MomentCard";
import { ExperienceCard } from "@/components/community/ExperienceCard";
import { CommunityVoice } from "@/components/community/CommunityVoice";
import { SurvivalCard } from "@/components/ui/SurvivalCard";
import { PathSelector } from "@/components/ui/PathSelector";
import { WorldGrid } from "@/components/ui/WorldGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";
import { FilmGrain } from "@/components/ui/FilmGrain";

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

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=2000&q=75"
            alt="Foreigners living in Japan"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "saturate(0.55) brightness(0.32) contrast(1.06) sepia(0.10)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
          <div className="ambient-ray" />
        </div>

        <FilmGrain opacity={0.065} className="z-[3]" />

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

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ScrollIndicator />
          </div>
        </div>
      </section>

      {/* ── Choose Your Path ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <PathSelector
            locale={locale}
            labelText={t("path_label")}
            titleText={t("path_title")}
            subtitleText={t("path_subtitle")}
            pathTranslations={{
              student: {
                label: t("path_student_label"),
                description: t("path_student_desc"),
              },
              work: {
                label: t("path_work_label"),
                description: t("path_work_desc"),
              },
              travel: {
                label: t("path_travel_label"),
                description: t("path_travel_desc"),
              },
              lost: {
                label: t("path_lost_label"),
                description: t("path_lost_desc"),
              },
              culture: {
                label: t("path_culture_label"),
                description: t("path_culture_desc"),
              },
              recommended: t("path_recommended"),
            }}
          />
        </FadeIn>
      </section>

      {/* ── Exploration worlds ────────────────────────────────────── */}
      <section className="pb-28 md:pb-36">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full mb-12">
          <FadeIn>
            <p className="text-caption text-[var(--color-sand)] mb-3 tracking-[0.2em]">
              {t("worlds_label")}
            </p>
            <h2 className="text-display-lg text-[var(--color-parchment)]">
              {t("worlds_title")}
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <WorldGrid worlds={worlds.slice(0, 8)} locale={locale} />
        </FadeIn>
      </section>

      {/* ── Survival truths ───────────────────────────────────────── */}
      <section id="survival" className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-20" />
        <FadeIn className="mb-14">
          <p className="text-caption text-[var(--color-sand)] mb-3 tracking-[0.2em]">
            {t("survival_label")}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)] max-w-2xl">
            {t("survival_title")}
          </h2>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5"
          staggerDelay={0.08}
        >
          {survivalTruths.map((truth) => (
            <StaggerItem key={truth.id}>
              <SurvivalCard truth={truth} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Community voices ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-20" />
        <FadeIn className="mb-14">
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

        <FadeIn className="mt-10" delay={0.2}>
          <Button href={`/${locale}/community`} variant="ghost">
            Read more voices
          </Button>
        </FadeIn>
      </section>

      {/* ── Experience stories ────────────────────────────────────── */}
      {experiences.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-20" />
          <FadeIn className="flex items-end justify-between mb-14 flex-wrap gap-4">
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

      {/* ── Cities ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-20" />
        <FadeIn className="mb-20">
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

      {/* ── Literary moments ─────────────────────────────────────── */}
      {moments.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-20" />
          <FadeIn className="flex items-end justify-between mb-14 flex-wrap gap-4">
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
      <section className="relative py-40 overflow-hidden">
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
