export type WorldTag =
  | "language"
  | "visa"
  | "apartment"
  | "community"
  | "culture"
  | "work"
  | "food"
  | "city"
  | "loneliness"
  | "map"
  | "seasonal"
  | "practical";

export interface World {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  path: string; // route without locale prefix, e.g. "/map"
  tags: WorldTag[];
  size: "lg" | "sm"; // lg = spans 2 cols on desktop
}

// Order matters — the grid alternates lg+sm+sm / sm+lg+sm / lg+sm+sm / sm+lg+sm
export const worlds: World[] = [
  {
    id: "emotional-map",
    category: "Interactive",
    title: "The Emotional Map",
    subtitle: "Memories, loneliness, and belonging — mapped across Japan.",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=75",
    path: "/map",
    tags: ["map", "culture", "loneliness"],
    size: "lg",
  },
  {
    id: "tonight-tokyo",
    category: "Documentary",
    title: "Tonight in Tokyo",
    subtitle: "What the city looks like at midnight when you don't know anyone.",
    imageUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=75",
    path: "/moments",
    tags: ["city", "loneliness"],
    size: "sm",
  },
  {
    id: "three-month-wall",
    category: "Psychology",
    title: "The Three-Month Wall",
    subtitle: "Why almost everyone almost quits — and what actually helps.",
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=75",
    path: "/moments",
    tags: ["loneliness", "community"],
    size: "sm",
  },
  {
    id: "language-keigo",
    category: "Language",
    title: "Language & Keigo",
    subtitle: "How register mistakes signal what you think of yourself.",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=75",
    path: "/living",
    tags: ["language", "culture", "work"],
    size: "sm",
  },
  {
    id: "visa-paperwork",
    category: "Practical",
    title: "Visa & Paperwork",
    subtitle: "The bureaucratic labyrinth, mapped by people who got through it.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=75",
    path: "/living",
    tags: ["visa", "practical"],
    size: "lg",
  },
  {
    id: "apartment-reality",
    category: "Housing",
    title: "Apartment Reality",
    subtitle: "Guarantors, key money, and what landlords never explain.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75",
    path: "/living",
    tags: ["apartment", "practical"],
    size: "sm",
  },
  {
    id: "city-personalities",
    category: "Cities",
    title: "City Personalities",
    subtitle: "Tokyo wants everything. Kyoto wants silence. Osaka wants to feed you.",
    imageUrl: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=1200&q=75",
    path: "/cities/tokyo",
    tags: ["city", "culture"],
    size: "lg",
  },
  {
    id: "finding-community",
    category: "Community",
    title: "Finding Community",
    subtitle: "How long-term foreigners actually built their social world.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=75",
    path: "/community",
    tags: ["community", "loneliness"],
    size: "sm",
  },
  {
    id: "konbini-culture",
    category: "Daily Life",
    title: "Konbini Culture",
    subtitle: "Japan's most underestimated institution — and how to use it fully.",
    imageUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=75",
    path: "/living",
    tags: ["food", "practical"],
    size: "sm",
  },
  {
    id: "workplace-reality",
    category: "Work",
    title: "Workplace Reality",
    subtitle: "Hierarchy, silence, and the signs of a company you should leave.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75",
    path: "/living",
    tags: ["work", "practical"],
    size: "sm",
  },
  {
    id: "seasonal-feelings",
    category: "Atmosphere",
    title: "Seasonal Feelings",
    subtitle: "How Japan changes you four times a year, whether you notice or not.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=75",
    path: "/moments",
    tags: ["seasonal", "culture"],
    size: "lg",
  },
  {
    id: "solo-living",
    category: "Solo Life",
    title: "Solo Living",
    subtitle: "The art of being alone in the world's loneliest city.",
    imageUrl: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=75",
    path: "/moments",
    tags: ["loneliness", "food"],
    size: "sm",
  },
];

// ── Path definitions ──────────────────────────────────

export type PathId = "student" | "work" | "travel" | "lost" | "culture";

export interface PathOption {
  id: PathId;
  icon: string;
  label: string;
  description: string;
  color: string;
  worldIds: string[];
}

export const paths: PathOption[] = [
  {
    id: "student",
    icon: "🎓",
    label: "Studying in Japan",
    description: "Language schools, universities, scholarships, student visa, first apartment.",
    color: "#7AADCA",
    worldIds: ["language-keigo", "apartment-reality", "finding-community", "three-month-wall"],
  },
  {
    id: "work",
    icon: "💼",
    label: "Working in Japan",
    description: "Work visa, workplace hierarchy, salary realities, black company warning signs.",
    color: "#c9a96e",
    worldIds: ["workplace-reality", "visa-paperwork", "finding-community", "three-month-wall"],
  },
  {
    id: "travel",
    icon: "✈️",
    label: "Traveling soon",
    description: "City personalities, food culture, konbini, transport, hidden places.",
    color: "#e85d4a",
    worldIds: ["tonight-tokyo", "konbini-culture", "city-personalities", "seasonal-feelings"],
  },
  {
    id: "lost",
    icon: "😔",
    label: "Already here, still lost",
    description: "You live in Japan but something isn't clicking yet.",
    color: "#9b7de0",
    worldIds: ["three-month-wall", "finding-community", "solo-living", "emotional-map"],
  },
  {
    id: "culture",
    icon: "🗾",
    label: "Understanding Japan",
    description: "Silence, hierarchy, seasons, the emotional reality of being here.",
    color: "#6aaa8c",
    worldIds: ["emotional-map", "seasonal-feelings", "language-keigo", "city-personalities"],
  },
];
