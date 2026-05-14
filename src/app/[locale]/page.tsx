import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAllCities } from "@/lib/cities";
import { getAllMoments } from "@/lib/content";
import { CityCard } from "@/components/cards/CityCard";
import { MomentCard } from "@/components/cards/MomentCard";
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
  const tM = await getTranslations("moments");

  const cities = getAllCities();
  const moments = getAllMoments().slice(0, 4);

  return (
    <>
      {/* ── Cinematic Hero ─────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background: layered gradient + image blend */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=2000&q=75"
            alt="Japan cityscape at night"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "saturate(0.6) brightness(0.35)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* The kanji */}
          <div
            className="font-display font-light text-[var(--color-sand)] animate-fade-in"
            style={{
              fontSize: "clamp(6rem, 20vw, 18rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              opacity: 0.15,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -55%)",
              userSelect: "none",
              zIndex: -1,
            }}
          >
            間
          </div>

          <div className="animate-fade-up">
            <p className="text-caption text-[var(--color-sand)] mb-8 tracking-[0.3em]">
              間 · MA
            </p>
          </div>

          <h1
            className="text-display-xl text-[var(--color-parchment)] animate-fade-up delay-200 mb-6"
          >
            {t("hero_subtitle")}
          </h1>

          <p
            className="text-lg md:text-xl text-[var(--color-sand-light)] max-w-2xl mx-auto
              leading-relaxed animate-fade-up delay-400 font-light"
          >
            {t("hero_body")}
          </p>

          <div className="mt-12 animate-fade-up delay-500 flex items-center justify-center gap-6 flex-wrap">
            <Button href={`/${locale}/cities/tokyo`} variant="outline">
              {t("cities_label")}
            </Button>
            <Button href={`/${locale}/moments`} variant="ghost">
              {t("moments_label")}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ScrollIndicator />
        </div>
      </section>

      {/* ── Cities ─────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn className="mb-16">
          <p className="text-caption mb-3">{t("cities_label")}</p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            Three cities.
            <br />
            <em className="font-light text-[var(--color-sand)]">
              Three feelings.
            </em>
          </h2>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.12}
        >
          {cities.map((city) => (
            <StaggerItem key={city.slug}>
              <CityCard city={city} locale={locale} exploreLabel="Explore" />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Divider ────────────────────────────────── */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand" />
      </div>

      {/* ── Featured moment ────────────────────────── */}
      {moments[0] && (
        <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <FadeIn className="mb-6">
            <p className="text-caption">{t("featured_label")}</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={moments[0].imageUrl}
                  alt={moments[0].imageAlt}
                  fill
                  className="object-cover img-cinematic"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-caption text-[var(--color-sand)] capitalize mb-4">
                  {moments[0].city} ·{" "}
                  {tM("read_time").replace(
                    "{min}",
                    String(moments[0].readingTime)
                  )}
                </p>
                <h3 className="text-display-md text-[var(--color-parchment)] mb-6">
                  {moments[0].title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed mb-8 text-base">
                  {moments[0].excerpt}
                </p>
                <Button href={`/${locale}/moments/${moments[0].slug}`} variant="ghost">
                  Read the story
                </Button>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* ── Moments grid ───────────────────────────── */}
      {moments.length > 1 && (
        <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <p className="text-caption mb-2">{t("moments_label")}</p>
              <h2 className="text-display-md text-[var(--color-parchment)]">
                Recent moments
              </h2>
            </div>
            <Button href={`/${locale}/moments`} variant="ghost">
              {t("moments_cta")}
            </Button>
          </FadeIn>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {moments.slice(1).map((moment) => (
              <StaggerItem key={moment.slug}>
                <MomentCard
                  moment={moment}
                  locale={locale}
                  readTimeLabel={tM("read_time")}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      {/* ── Philosophy strip ───────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-tokyo-from)] via-[#0d1520] to-[var(--color-kyoto-from)] opacity-60" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-caption text-[var(--color-sand)] mb-8">
              — philosophy
            </p>
            <blockquote className="text-display-md text-[var(--color-parchment)] font-light italic leading-snug">
              "Japan is not a destination.
              <br />
              It is a{" "}
              <em className="text-[var(--color-sand)] not-italic">feeling</em>."
            </blockquote>
            <div className="mt-10">
              <Button href={`/${locale}/about`} variant="outline">
                Read the manifesto
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
