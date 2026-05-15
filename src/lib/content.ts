import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Moment, MomentFrontmatter, Experience, ExperienceFrontmatter } from "./types";

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

// ─── Experiences ──────────────────────────────────

const EXPERIENCES_DIR = path.join(process.cwd(), "src/content/experiences");

export function getExperienceSlugs(): string[] {
  if (!fs.existsSync(EXPERIENCES_DIR)) return [];
  return fs
    .readdirSync(EXPERIENCES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getExperience(slug: string): Experience | null {
  const filePath = path.join(EXPERIENCES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as ExperienceFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: fm.title,
    city: fm.city,
    category: fm.category,
    date: fm.date,
    excerpt: fm.excerpt,
    readingTime: Math.ceil(stats.minutes),
    imageUrl: fm.imageUrl,
    imageAlt: fm.imageAlt,
    person: {
      name: fm.personName,
      role: fm.personRole,
      nationality: fm.personNationality,
      city: fm.personCity,
      yearsInJapan: fm.personYears,
      avatarInitials: fm.personName
        .split(" ")
        .map((n) => n[0])
        .join(""),
    },
    tags: fm.tags ?? [],
    content,
  };
}

export function getAllExperiences(): Experience[] {
  return getExperienceSlugs()
    .map((slug) => getExperience(slug))
    .filter((e): e is Experience => e !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getExperiencesByCity(citySlug: string): Experience[] {
  return getAllExperiences().filter((e) => e.city === citySlug);
}

// ─── Shared helpers ────────────────────────────────

const localeToTag: Record<string, string> = {
  en: "en-US", ja: "ja-JP", "zh-TW": "zh-TW", "zh-CN": "zh-CN",
  ko: "ko-KR", vi: "vi-VN", id: "id-ID", th: "th-TH", es: "es-ES",
};

export function formatDate(dateStr: string, locale: string = "en"): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(localeToTag[locale] ?? "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
