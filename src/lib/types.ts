export type Locale = "en" | "ja";

export type CitySlug = "tokyo" | "kyoto" | "osaka";

export interface CityPalette {
  from: string;
  to: string;
  accent: string;
}

export interface City {
  slug: CitySlug;
  name: string;
  nameJa: string;
  tagline: string;
  taglineJa: string;
  description: string;
  descriptionJa: string;
  palette: CityPalette;
  imageUrl: string;
  imageAlt: string;
  population: string;
  prefecture: string;
  feelings: string[];
  feelingsJa: string[];
}

export interface Moment {
  slug: string;
  title: string;
  titleJa?: string;
  city: CitySlug;
  date: string;
  excerpt: string;
  readingTime: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  content?: string;
}

export interface MomentFrontmatter {
  title: string;
  titleJa?: string;
  city: CitySlug;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
}

// ─── Community / Living types ──────────────────────

export type LifeCategorySlug =
  | "work"
  | "study"
  | "language"
  | "food"
  | "housing"
  | "daily-life"
  | "neighborhoods"
  | "hidden-spots";

export interface LifeCategory {
  slug: LifeCategorySlug;
  label: string;
  labelJa: string;
  description: string;
  icon: string;
}

export interface ExperiencePerson {
  name: string;
  role: string;
  nationality: string;
  city: CitySlug;
  yearsInJapan: number;
  avatarInitials: string;
}

export interface CommunityVoice {
  id: string;
  person: ExperiencePerson;
  quote: string;
  quoteJa?: string;
  category: LifeCategorySlug;
}

export interface Experience {
  slug: string;
  title: string;
  city: CitySlug;
  category: LifeCategorySlug;
  date: string;
  excerpt: string;
  readingTime: number;
  imageUrl: string;
  imageAlt: string;
  person: ExperiencePerson;
  tags: string[];
  content?: string;
}

export interface ExperienceFrontmatter {
  title: string;
  city: CitySlug;
  category: LifeCategorySlug;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  personName: string;
  personRole: string;
  personNationality: string;
  personYears: number;
  personCity: CitySlug;
  tags: string[];
}

export interface Neighborhood {
  slug: string;
  name: string;
  nameJa: string;
  city: CitySlug;
  vibe: string;
  description: string;
  insiderTip: string;
  imageUrl: string;
  tags: string[];
}

export interface InsiderTip {
  id: string;
  city: CitySlug | "all";
  category: LifeCategorySlug;
  tip: string;
  context: string;
}
