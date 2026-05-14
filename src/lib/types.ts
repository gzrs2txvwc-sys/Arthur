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
