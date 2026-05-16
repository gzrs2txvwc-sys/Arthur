import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("quote"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");

  const manifestoParagraphs = [
    t("manifesto_1"), t("manifesto_2"), t("manifesto_3"),
    t("manifesto_4"), t("manifesto_5"), t("manifesto_6"),
  ];

  const values = [
    { title: t("value_honest_title"), description: t("value_honest_desc") },
    { title: t("value_slow_title"),   description: t("value_slow_desc") },
    { title: t("value_literary_title"), description: t("value_literary_desc") },
    { title: t("value_specific_title"), description: t("value_specific_desc") },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-caption text-[var(--color-sand)] mb-6">
            {t("manifesto_label")}
          </p>
          <h1 className="text-display-xl text-[var(--color-parchment)] mb-8">
            {t("title")}
          </h1>
          <p className="text-display-md font-display font-light italic text-[var(--color-sand)] max-w-2xl">
            &ldquo;{t("quote")}&rdquo;
          </p>
        </FadeIn>
      </section>

      {/* ── Manifesto body ────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="space-y-10">
          {manifestoParagraphs.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <p
                className={`text-lg text-[var(--color-parchment-warm)] leading-relaxed ${
                  i === 0 ? "drop-cap" : ""
                }`}
              >
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────── */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="hr-sand" />
      </div>

      {/* ── Values ──────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <FadeIn className="mb-16">
          <p className="text-caption mb-3">{t("how_we_work")}</p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            {t("principles_title")}
          </h2>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          staggerDelay={0.1}
        >
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-display-md font-display font-light text-[var(--color-sand)] mb-4">
                  {value.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-kyoto-from)] to-[var(--color-ink)] opacity-80" />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <FadeIn>
            <p className="font-japanese text-[var(--color-sand)] text-2xl mb-6 opacity-60">
              間
            </p>
            <h2 className="text-display-md text-[var(--color-parchment)] mb-4">
              {t("begin_city")}
            </h2>
            <p className="text-[var(--color-muted)] mb-10">
              {t("choose_mood")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["tokyo", "kyoto", "osaka"].map((city) => (
                <Button
                  key={city}
                  href={`/${locale}/cities/${city}`}
                  variant="outline"
                >
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </Button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
