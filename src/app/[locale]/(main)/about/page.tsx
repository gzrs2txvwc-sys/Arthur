import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MA — Manifesto",
  description:
    "MA is not a travel guide. It is an attempt to capture what Japan actually feels like.",
};

const manifestoParagraphs = [
  "Most writing about Japan is wrong — not factually, but emotionally. It reduces a civilization of extraordinary depth to a list of things to do and places to see. It treats mystery as a problem to be solved, silence as an absence to be filled.",
  "MA began from a different premise: that Japan deserves to be written about the way it actually feels. Electric and lonely in Tokyo at 3am. Quiet and ancient in Kyoto before the crowds. Warm and unguarded in Osaka over a bowl of ramen that someone has been perfecting for thirty years.",
  "We are not a travel guide. We do not tell you what to do. We tell you what it feels like to be there — the specific texture of certain hours in certain places, the emotional weather of cities that have been shaped by centuries of particular values: restraint, precision, beauty, impermanence.",
  "The name comes from 間 (ma), a Japanese concept with no direct English translation. It means the space between things — the pause between notes that makes music meaningful, the gap between objects that gives them definition, the silence that makes speech worth hearing. Every piece we publish lives in that space.",
  "We write slowly, carefully, and honestly. We do not publish AI-generated content. We do not optimize for search engines. We do not produce lists. We produce felt experiences, honestly recalled.",
  "Japan is not a destination. It is a feeling. We are trying to share it.",
];

const values = [
  {
    title: "Honest",
    description:
      "We write from real experience. No press trips, no sponsored content, no AI-generated text. Every word is accountable to the actual feeling of being somewhere.",
  },
  {
    title: "Slow",
    description:
      "We publish rarely and carefully. One well-observed moment is worth more than a hundred rushed dispatches.",
  },
  {
    title: "Literary",
    description:
      "We treat travel writing as literature — with all the craft, ambiguity, and emotional honesty that implies.",
  },
  {
    title: "Specific",
    description:
      "We resist generalization. The feeling of Tokyo at 3am in November rain is different from Tokyo at noon in August. We care about the difference.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");

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
            &ldquo;Not a travel guide. A feeling, honestly shared.&rdquo;
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
          <p className="text-caption mb-3">How we work</p>
          <h2 className="text-display-lg text-[var(--color-parchment)]">
            Our principles
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
              Begin with a city.
            </h2>
            <p className="text-[var(--color-muted)] mb-10">
              Each one feels different. Choose the mood you are in.
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
