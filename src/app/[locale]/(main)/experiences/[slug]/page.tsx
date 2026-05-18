import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { getExperience, getExperienceSlugs, formatDate } from "@/lib/content";
import { getCity } from "@/lib/cities";
import { PullQuote } from "@/components/content/PullQuote";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug, "en");
  if (!exp) return {};
  return {
    title: exp.title,
    description: exp.excerpt,
    openGraph: { images: [exp.imageUrl] },
  };
}

const mdxComponents = {
  PullQuote,
  hr: () => <hr className="hr-sand my-12" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <PullQuote>{children}</PullQuote>
  ),
};

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const exp = getExperience(slug, locale);
  if (!exp) notFound();

  const t = await getTranslations("experiences");
  const city = getCity(exp.city);

  const { content } = await compileMDX({
    source: exp.content ?? "",
    components: mdxComponents,
  });

  const cityAccentMap: Record<string, string> = {
    tokyo: "var(--color-tokyo-accent)",
    kyoto: "var(--color-kyoto-accent)",
    osaka: "var(--color-osaka-accent)",
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={exp.imageUrl}
            alt={exp.imageAlt}
            fill
            priority
            className="object-cover"
            style={{ filter: "saturate(0.6) brightness(0.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 100%, transparent), color-mix(in srgb, var(--color-ink) 30%, transparent), transparent)" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pb-14 w-full">
          {/* Person card */}
          <div className="animate-fade-up flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm
                font-mono font-medium text-[var(--color-ink)] shrink-0"
              style={{
                background: `linear-gradient(135deg, var(--color-${exp.person.city}-from), var(--color-${exp.person.city}-to))`,
              }}
            >
              {exp.person.avatarInitials}
            </div>
            <div>
              <p className="text-[var(--color-parchment)] text-sm font-medium">
                {exp.person.name}
              </p>
              <p className="text-caption text-[var(--color-muted)]">
                {exp.person.role} · {exp.person.nationality} ·{" "}
                {t("years_in_japan").replace("{n}", String(exp.person.yearsInJapan))}
              </p>
            </div>
            <span
              className="ml-auto text-caption capitalize"
              style={{ color: cityAccentMap[exp.city] ?? "var(--color-sand)" }}
            >
              {exp.city}
            </span>
          </div>

          <h1 className="text-display-lg text-[var(--color-parchment)] animate-fade-up delay-100 mb-3 max-w-3xl">
            {exp.title}
          </h1>

          <p className="text-[var(--color-sand-light)] text-lg font-light animate-fade-up delay-200 max-w-2xl">
            {exp.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-5 animate-fade-up delay-300">
            <span className="text-caption text-[var(--color-muted)]">
              {t("read_time").replace("{min}", String(exp.readingTime))}
            </span>
            <span className="text-caption text-[var(--color-muted)]">·</span>
            <span className="text-caption text-[var(--color-muted)]">
              {formatDate(exp.date, locale)}
            </span>
          </div>
        </div>
      </section>

      {/* ── Article ───────────────────────────── */}
      <article className="py-16 md:py-24 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <FadeIn>
          <div
            className="prose prose-lg prose-ma max-w-none
              prose-headings:font-display prose-headings:font-light
              prose-h2:text-display-md prose-h2:mt-16 prose-h2:mb-6
              prose-p:leading-relaxed prose-p:text-[var(--color-parchment-warm)]
              prose-strong:text-[var(--color-parchment)]
              prose-em:text-[var(--color-sand)]
              prose-a:text-[var(--color-sand)] prose-a:no-underline hover:prose-a:underline
              [&>p:first-of-type]:drop-cap"
          >
            {content}
          </div>
        </FadeIn>

        {/* Tags */}
        <FadeIn delay={0.1} className="mt-16">
          <div className="hr-sand mb-8" />
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn delay={0.15} className="mt-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button href={`/${locale}/community`} variant="ghost">
              ← {t("back")}
            </Button>
            {city && (
              <Button href={`/${locale}/cities/${city.slug}`} variant="ghost">
                {t("living_in", { city: city.name })}
              </Button>
            )}
          </div>
        </FadeIn>
      </article>
    </>
  );
}
