import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getCity, getAllCities } from "@/lib/cities";
import { getMomentsByCity } from "@/lib/content";
import { MomentCard } from "@/components/cards/MomentCard";
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
    title: `${city.name} — ${city.tagline}`,
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
  const moments = getMomentsByCity(city.slug as CitySlug);

  const gradientClass = `gradient-${city.slug}`;

  return (
    <>
      {/* ── Cinematic Hero ────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={city.imageUrl}
            alt={city.imageAlt}
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "saturate(0.7) brightness(0.4)" }}
          />
          {/* City-tinted gradient */}
          <div
            className={`absolute inset-0 opacity-50 ${gradientClass}`}
            style={{ mixBlendMode: "hard-light" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-32 w-full">
          <div className="animate-fade-up">
            <p className="text-caption text-[var(--color-sand)] mb-4 tracking-[0.2em]">
              {t("the_feeling")}
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

          <h1
            className="text-display-xl text-[var(--color-parchment)] animate-fade-up delay-200 mb-6"
          >
            {city.name}
          </h1>

          <p
            className="text-display-md italic font-light text-[var(--color-sand)] animate-fade-up delay-300"
          >
            {city.tagline}
          </p>

          {/* Feelings strip */}
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-up delay-400">
            {city.feelings.map((feeling) => (
              <span
                key={feeling}
                className="text-caption text-[var(--color-muted)] border border-white/10 px-3 py-1.5 rounded-sm"
              >
                {feeling}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── City portrait ──────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Sidebar */}
          <FadeIn className="lg:col-span-3">
            <div className="space-y-6">
              <div>
                <p className="text-caption mb-1">Prefecture</p>
                <p className="text-sm text-[var(--color-parchment-warm)]">
                  {city.prefecture}
                </p>
              </div>
              <div>
                <p className="text-caption mb-1">Population</p>
                <p className="text-sm text-[var(--color-parchment-warm)]">
                  {city.population}
                </p>
              </div>
              <div className="hr-sand" />
              <div>
                <p className="text-caption mb-3">感覚 — Feelings</p>
                <ul className="space-y-2">
                  {city.feelingsJa.map((feeling) => (
                    <li
                      key={feeling}
                      className="text-sm text-[var(--color-muted)] font-japanese"
                    >
                      {feeling}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.15} className="lg:col-span-9">
            <p
              className="text-display-md font-display font-light italic text-[var(--color-sand)] mb-10"
              style={{ lineHeight: 1.3 }}
            >
              &ldquo;{city.taglineJa}&rdquo;
            </p>
            <p className="text-lg text-[var(--color-parchment-warm)] leading-relaxed max-w-3xl">
              {city.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────── */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand" />
      </div>

      {/* ── Moments from this city ──────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn className="mb-16">
          <p className="text-caption mb-3">
            {t("moments_in")} {city.name}
          </p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            Stories from
            <br />
            <em className="font-light text-[var(--color-sand)]">
              {city.name}
            </em>
          </h2>
        </FadeIn>

        {moments.length > 0 ? (
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.12}
          >
            {moments.map((moment) => (
              <StaggerItem key={moment.slug}>
                <MomentCard
                  moment={moment}
                  locale={locale}
                  readTimeLabel={tM("read_time")}
                />
              </StaggerItem>
            ))}
          </StaggerChildren>
        ) : (
          <FadeIn>
            <p className="text-[var(--color-muted)] text-lg">
              Stories from {city.name} are being written. Come back soon.
            </p>
          </FadeIn>
        )}
      </section>

      {/* ── Other cities ────────────────────────── */}
      <section className="py-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="hr-sand mb-16" />
          <p className="text-caption mb-6">Continue exploring</p>
          <div className="flex flex-wrap gap-4">
            {(["tokyo", "kyoto", "osaka"] as const)
              .filter((s) => s !== city.slug)
              .map((s) => (
                <Button key={s} href={`/${locale}/cities/${s}`} variant="outline">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
