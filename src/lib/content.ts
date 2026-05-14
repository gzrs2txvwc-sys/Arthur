import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Moment, MomentFrontmatter } from "./types";

const MOMENTS_DIR = path.join(process.cwd(), "src/content/moments");

export function getMomentSlugs(): string[] {
  if (!fs.existsSync(MOMENTS_DIR)) return [];
  return fs
    .readdirSync(MOMENTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMoment(slug: string): Moment | null {
  const filePath = path.join(MOMENTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as MomentFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: fm.title,
    titleJa: fm.titleJa,
    city: fm.city,
    date: fm.date,
    excerpt: fm.excerpt,
    readingTime: Math.ceil(stats.minutes),
    imageUrl: fm.imageUrl,
    imageAlt: fm.imageAlt,
    tags: fm.tags ?? [],
    content,
  };
}

export function getAllMoments(): Moment[] {
  return getMomentSlugs()
    .map((slug) => getMoment(slug))
    .filter((m): m is Moment => m !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMomentsByCity(citySlug: string): Moment[] {
  return getAllMoments().filter((m) => m.city === citySlug);
}

export function formatDate(dateStr: string, locale: string = "en"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
