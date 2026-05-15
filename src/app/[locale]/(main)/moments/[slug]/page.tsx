import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { getMoment, getMomentSlugs, formatDate } from "@/lib/content";
import { getCity } from "@/lib/cities";
import { PullQuote } from "@/components/content/PullQuote";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getMomentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const moment = getMoment(slug);
  if (!moment) return {};
  return {
    title: moment.title,
    description: moment.excerpt,
    openGraph: { images: [moment.imageUrl] },
  };
}

const mdxComponents = {
  PullQuote,
  hr: () => <hr className="hr-sand my-12" />,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <PullQuote>{children}</PullQuote>
  ),
};

export default async function MomentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const moment = getMoment(slug);
  if (!moment) notFound();

  const t = await getTranslations("moments");
  const city = getCity(moment.city);

  const { content } = await compileMDX({
    source: moment.content ?? "",
    components: mdxComponents,
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={moment.imageUrl}
            alt={moment.imageAlt}
            fill
            priority
            className="object-cover"
            style={{ filter: "saturate(0.7) brightness(0.35)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pb-16 w-full">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {city && (
                <span className="text-caption text-[var(--color-sand)] capitalize">
                  {city.name}
                </span>
              )}
              <span className="text-caption text-[var(--color-muted)]">·</span>
              <span className="text-caption text-[var(--color-muted)]">
                {t("read_time").replace("{min}", String(moment.readingTime))}
              </span>
              <span className="text-caption text-[var(--color-muted)]">·</span>
              <span className="text-caption text-[var(--color-muted)]">
                {formatDate(moment.date, locale)}
              </span>
            </div>
          </div>

          <h1 className="text-display-lg text-[var(--color-parchment)] animate-fade-up delay-100 mb-4">
            {moment.title}
          </h1>

          <p className="text-lg text-[var(--color-sand-light)] font-light animate-fade-up delay-200 max-w-2xl">
            {moment.excerpt}
          </p>
        </div>
      </section>

      {/* ── Article body ──────────────────────── */}
      <article className="py-16 md:py-24 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <FadeIn>
          <div
            className="prose prose-lg prose-ma max-w-none
              prose-headings:font-display prose-headings:font-light
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
            {moment.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </FadeIn>

        {/* Navigation */}
        <FadeIn delay={0.15} className="mt-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button href={`/${locale}/moments`} variant="ghost">
              ← {t("all_moments")}
            </Button>
            {city && (
              <Button href={`/${locale}/cities/${city.slug}`} variant="ghost">
                More from {city.name}
              </Button>
            )}
          </div>
        </FadeIn>
      </article>
    </>
  );
}
