import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getCity, getAllCities } from "@/lib/cities";
import { getMomentsByCity, getExperiencesByCity } from "@/lib/content";
import { getNeighborhoodsByCity, getTipsByCity } from "@/lib/community";
import { MomentCard } from "@/components/cards/MomentCard";
import { ExperienceCard } from "@/components/community/ExperienceCard";
import { InsiderTip } from "@/components/ui/InsiderTip";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import type { CitySlug } from "@/lib/types";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `Living in ${city.name} — ${city.tagline}`,
    description: city.description.substring(0, 160),
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const t = await getTranslations("cities");
  const tM = await getTranslations("moments");
  const tCC = await getTranslations("cities_content");
  const tN = await getTranslations("neighborhoods");
  const tTip = await getTranslations("tips");

  const localizedTagline = tCC(`${slug as "tokyo"}.tagline`);
  const localizedDescription = tCC(`${slug as "tokyo"}.description`);
  const localizedFeelings = tCC(`${slug as "tokyo"}.feelings`).split("|");

  const moments = getMomentsByCity(city.slug as CitySlug, locale);
  const experiences = getExperiencesByCity(city.slug, locale);
  const cityNeighborhoods = getNeighborhoodsByCity(city.slug);
  const cityTips = getTipsByCity(city.slug).slice(0, 3);

  const gradientClass = `gradient-${city.slug}`;

  return (
    <>
      {/* ── Cinematic Hero ────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={city.imageUrl}
            alt={city.imageAlt}
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "saturate(0.7) brightness(0.35)" }}
          />
          <div
            className={`absolute inset-0 opacity-45 ${gradientClass}`}
            style={{ mixBlendMode: "hard-light" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-32 w-full">
          <div className="animate-fade-up">
            <p className="text-caption text-[var(--color-sand)] mb-4 tracking-[0.2em]">
              {t("living_title")}
            </p>
          </div>
          <div className="animate-fade-up delay-100">
            <p
              className="font-japanese text-[var(--color-sand)] opacity-60 mb-2"
              style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}
            >
              {city.nameJa}
            </p>
          </div>
          <h1 className="text-display-xl text-[var(--color-parchment)] animate-fade-up delay-200 mb-6">
            {city.name}
          </h1>
          <p className="text-display-md italic font-light text-[var(--color-sand)] animate-fade-up delay-300">
            {localizedTagline}
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up delay-400">
            {localizedFeelings.map((feeling) => (
              <span
                key={feeling}
                className="text-caption text-[var(--color-muted)] border border-white/10 px-3 py-1.5"
              >
                {feeling}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── City portrait ─────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <FadeIn className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <p className="text-caption mb-1">{t("prefecture")}</p>
                <p className="text-sm text-[var(--color-parchment-warm)]">{city.prefecture}</p>
              </div>
              <div>
                <p className="text-caption mb-1">{t("population")}</p>
                <p className="text-sm text-[var(--color-parchment-warm)]">{city.population}</p>
              </div>
              <div className="hr-sand" />
              <div>
                <p className="text-caption mb-3">{t("feelings_label")}</p>
                <ul className="space-y-2">
                  {city.feelingsJa.map((feeling) => (
                    <li key={feeling} className="text-sm text-[var(--color-muted)] font-japanese">
                      {feeling}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hr-sand" />
              <div className="flex flex-col gap-3">
                <Button href={`/${locale}/community`} variant="ghost">
                  {t("read_experiences")}
                </Button>
                <Button href={`/${locale}/living`} variant="ghost">
                  {t("practical_guide")}
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-9">
            <p
              className="text-display-md font-display font-light italic text-[var(--color-sand)] mb-10"
              style={{ lineHeight: 1.3 }}
            >
              &ldquo;{city.taglineJa}&rdquo;
            </p>
            <p className="text-lg text-[var(--color-parchment-warm)] leading-relaxed max-w-3xl">
              {localizedDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Foreigner experiences ─────────────────────── */}
      {experiences.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <FadeIn className="mb-12">
            <p className="text-caption text-[var(--color-sand)] mb-3">
              {t("experiences_in")} {city.name}
            </p>
            <h2 className="text-display-lg text-[var(--color-parchment)]">
              {t("living_here")}
            </h2>
          </FadeIn>
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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

      {/* ── Neighborhoods ─────────────────────────────── */}
      {cityNeighborhoods.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <FadeIn className="mb-12">
            <p className="text-caption text-[var(--color-sand)] mb-3">
              {t("neighborhoods_label")}
            </p>
            <h2 className="text-display-lg text-[var(--color-parchment)]">
              {t("where_to_live", { city: city.name })}
            </h2>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            staggerDelay={0.1}
          >
            {cityNeighborhoods.map((n) => (
              <StaggerItem key={n.slug}>
                <div className="border border-white/8 bg-white/[0.02] p-6 hover:border-[var(--color-sand)]/20 transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-display font-light text-[var(--color-parchment)]">
                        {n.name}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)] font-japanese mt-0.5">
                        {n.nameJa}
                      </p>
                    </div>
                    <span className="text-caption border border-white/10 px-3 py-1.5 shrink-0">
                      {tN(`${n.slug as "shimokitazawa"}.vibe`)}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-parchment-warm)] leading-relaxed mb-4">
                    {tN(`${n.slug as "shimokitazawa"}.description`)}
                  </p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-caption text-[var(--color-sand)] mb-2">{t("insider_tip")}</p>
                    <p className="text-sm text-[var(--color-muted)] italic leading-relaxed">
                      {tN(`${n.slug as "shimokitazawa"}.insiderTip`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* ── Insider tips ──────────────────────────────── */}
      {cityTips.length > 0 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="hr-sand mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <FadeIn className="lg:col-span-4">
              <p className="text-caption text-[var(--color-sand)] mb-3">
                {t("tips_label")}
              </p>
              <h2 className="text-display-md text-[var(--color-parchment)] mb-4">
                {t("insiders_know", { city: city.name })}
              </h2>
              <Button href={`/${locale}/living`} variant="ghost">
                {t("full_living_guide")}
              </Button>
            </FadeIn>
            <StaggerChildren className="lg:col-span-8 flex flex-col gap-4" staggerDelay={0.1}>
              {cityTips.map((tip) => (
                <StaggerItem key={tip.id}>
                  <InsiderTip
                    tip={tTip(`${tip.id as "tip-1"}.tip`)}
                    context={tTip(`${tip.id as "tip-1"}.context`)}
                    variant="highlighted"
                  />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}

      {/* ── Literary moments ──────────────────────────── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand mb-16" />
        <FadeIn className="mb-12">
          <p className="text-caption mb-3">{t("moments_in")} {city.name}</p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("atmosphere_of", { city: city.name })}
          </h2>
        </FadeIn>

        {moments.length > 0 ? (
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.12}
          >
            {moments.map((moment) => (
              <StaggerItem key={moment.slug}>
                <MomentCard moment={moment} locale={locale} readTimeLabel={tM("read_time")} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <FadeIn>
            <p className="text-[var(--color-muted)] text-lg">
              {t("coming_soon", { city: city.name })}
            </p>
          </FadeIn>
        )}
      </section>

      {/* ── Other cities ──────────────────────────────── */}
      <section className="py-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="hr-sand mb-12" />
          <p className="text-caption mb-6">{t("compare_cities")}</p>
          <div className="flex flex-wrap gap-4">
            {(["tokyo", "kyoto", "osaka"] as const)
              .filter((s) => s !== city.slug)
              .map((s) => (
                <Button key={s} href={`/${locale}/cities/${s}`} variant="outline">
                  {t("living_in", { city: s.charAt(0).toUpperCase() + s.slice(1) })}
                </Button>
              ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
