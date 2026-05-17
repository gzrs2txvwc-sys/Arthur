import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getMoment, getMomentSlugs, getAllMoments, formatDate } from "@/lib/content";
import { getCity } from "@/lib/cities";
import { PullQuote } from "@/components/content/PullQuote";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { WorldBridge } from "@/components/ui/WorldBridge";
import type { Moment } from "@/lib/types";
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
  const moment = getMoment(slug, "en");
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

function NextStoryCard({ story, locale }: { story: Moment; locale: string }) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (
    <Link
      href={`${prefix}/moments/${story.slug}`}
      className="group relative block overflow-hidden"
      style={{ minHeight: "clamp(200px, 28vh, 300px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={story.imageUrl}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ filter: "saturate(0.22) brightness(0.24) contrast(1.14) sepia(0.3)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(48, 32, 12, 0.22)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/96 via-[#0a0a0a]/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
        <span
          className="font-mono block mb-3"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#C9A96E", opacity: 0.55 }}
        >
          NEXT STORY
        </span>
        <h3
          className="font-display font-light leading-snug mb-2"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "var(--color-parchment)" }}
        >
          {story.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--color-muted)", opacity: 0.6 }}
        >
          {story.excerpt}
        </p>
        <span
          className="font-mono flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
          style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#C9A96E", opacity: 0.7 }}
        >
          Read →
        </span>
      </div>
    </Link>
  );
}

export default async function MomentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const moment = getMoment(slug, locale);
  if (!moment) notFound();

  const t = await getTranslations("moments");
  const city = getCity(moment.city);

  // Next/prev story
  const allMoments = getAllMoments(locale);
  const currentIndex = allMoments.findIndex((m) => m.slug === slug);
  const nextMoment = currentIndex < allMoments.length - 1 ? allMoments[currentIndex + 1] : allMoments[0];
  const prevMoment = currentIndex > 0 ? allMoments[currentIndex - 1] : null;

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
            style={{ filter: "saturate(0.22) brightness(0.26) contrast(1.12) sepia(0.3)" }}
          />
          {/* Archival amber tint — paper/library feeling */}
          <div className="absolute inset-0" style={{ background: "rgba(48, 32, 12, 0.2)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-transparent" />
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
        <FadeIn delay={0.1} className="mt-10">
          <div className="hr-sand mb-8" />
          <div className="flex flex-wrap gap-2">
            {moment.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </FadeIn>

        {/* Small back link */}
        <FadeIn delay={0.15} className="mt-8">
          {prevMoment && (
            <Link
              href={`/${locale}/moments/${prevMoment.slug}`}
              className="text-[9px] font-mono tracking-[0.2em] transition-opacity hover:opacity-100"
              style={{ color: "var(--color-muted)", opacity: 0.4 }}
            >
              ← {prevMoment.title}
            </Link>
          )}
        </FadeIn>

        {/* Next story — full-width pull */}
        <FadeIn delay={0.2} className="mt-12">
          <NextStoryCard story={nextMoment} locale={locale} />
        </FadeIn>

        {/* World bridge */}
        <FadeIn delay={0.25}>
          <WorldBridge exclude="stories" locale={locale} />
        </FadeIn>
      </article>
    </>
  );
}
