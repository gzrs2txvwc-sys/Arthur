import type { LifeCategory, CommunityVoice, Neighborhood, InsiderTip } from "./types";

export const lifeCategories: LifeCategory[] = [
  {
    slug: "work",
    label: "Working in Japan",
    labelJa: "日本での仕事",
    description: "Visas, office culture, remote work, teaching English, and finding your footing.",
    icon: "briefcase",
  },
  {
    slug: "study",
    label: "Student Life",
    labelJa: "学生生活",
    description: "Universities, language schools, JLPT prep, and what campus life actually looks like.",
    icon: "graduation-cap",
  },
  {
    slug: "language",
    label: "Learning Japanese",
    labelJa: "日本語学習",
    description: "From zero to daily conversation — apps, tutors, immersion tricks that actually work.",
    icon: "languages",
  },
  {
    slug: "food",
    label: "Food & Eating",
    labelJa: "食べ物",
    description: "Navigating menus, finding your neighborhood spot, food allergies, grocery runs.",
    icon: "utensils",
  },
  {
    slug: "housing",
    label: "Finding Housing",
    labelJa: "住居探し",
    description: "Gaijin houses, apartments, guarantors, the paperwork mountain — real advice.",
    icon: "home",
  },
  {
    slug: "daily-life",
    label: "Daily Life",
    labelJa: "日常生活",
    description: "Konbini survival, cash culture, hospital visits, and 100 small things nobody warns you about.",
    icon: "sun",
  },
  {
    slug: "neighborhoods",
    label: "Neighborhoods",
    labelJa: "街",
    description: "Where to actually live — not the tourist areas. The real spots, by people who live there.",
    icon: "map-pin",
  },
  {
    slug: "hidden-spots",
    label: "Hidden Spots",
    labelJa: "隠れた場所",
    description: "The places locals know but guidebooks miss. Shared by insiders, not algorithms.",
    icon: "compass",
  },
];

export const communityVoices: CommunityVoice[] = [
  {
    id: "sarah-tokyo",
    person: {
      name: "Sarah Kim",
      role: "English Teacher",
      nationality: "Canadian",
      city: "tokyo",
      yearsInJapan: 3,
      avatarInitials: "SK",
    },
    quote:
      "Nobody told me that the hardest part of living in Tokyo isn't the language — it's figuring out which convenience store is your convenience store. Once you have that, you have a home.",
    category: "daily-life",
  },
  {
    id: "marcus-kyoto",
    person: {
      name: "Marcus Weber",
      role: "PhD Student",
      nationality: "German",
      city: "kyoto",
      yearsInJapan: 2,
      avatarInitials: "MW",
    },
    quote:
      "I moved to Kyoto for a research program and stayed for the mornings. At 6am, before the tour groups arrive, this city belongs to you in a way that feels almost unfair.",
    category: "study",
  },
  {
    id: "priya-osaka",
    person: {
      name: "Priya Nair",
      role: "UX Designer",
      nationality: "Indian",
      city: "osaka",
      yearsInJapan: 4,
      avatarInitials: "PN",
    },
    quote:
      "Osaka is the first place outside India where strangers talked to me in line at a restaurant. Not tourist-talk. Real talk. About food, about the neighborhood, about where I was from. I didn't expect that.",
    category: "daily-life",
  },
  {
    id: "james-tokyo",
    person: {
      name: "James Okafor",
      role: "Software Engineer",
      nationality: "Nigerian-British",
      city: "tokyo",
      yearsInJapan: 5,
      avatarInitials: "JO",
    },
    quote:
      "The loneliness hit in year two. Year one is euphoria, year two is reality. What helped was finding Shimokitazawa — that neighborhood saved me. It felt like a place that made room for odd people.",
    category: "neighborhoods",
  },
  {
    id: "elena-kyoto",
    person: {
      name: "Elena Rossi",
      role: "Japanese Language Student",
      nationality: "Italian",
      city: "kyoto",
      yearsInJapan: 1,
      avatarInitials: "ER",
    },
    quote:
      "I failed the JLPT N4 twice before I realized I was studying for a test, not for a life. The day I stopped studying and just started talking to my neighbor, everything changed.",
    category: "language",
  },
  {
    id: "david-osaka",
    person: {
      name: "David Chen",
      role: "Chef",
      nationality: "Taiwanese-American",
      city: "osaka",
      yearsInJapan: 6,
      avatarInitials: "DC",
    },
    quote:
      "Finding my apartment in Osaka took four months and three rejections because I was foreign. When I finally got the place in Namba, the landlord apologized and took me out for kushikatsu. Japan will break your heart and then feed you.",
    category: "housing",
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: "shimokitazawa",
    name: "Shimokitazawa",
    nameJa: "下北沢",
    city: "tokyo",
    vibe: "Bohemian & creative",
    description:
      "Vintage clothes, live music, tiny theatre, and the sense that it's 1992 in the best possible way. Where Tokyo's artists, students, and quiet rebels have always lived.",
    insiderTip:
      "The Sunday flea market behind Honda Theater starts at 9am. Go early — the good stuff is gone by 10.",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=75",
    tags: ["arts", "vintage", "live-music", "cafes"],
  },
  {
    slug: "yanaka",
    name: "Yanaka",
    nameJa: "谷中",
    city: "tokyo",
    vibe: "Old Tokyo, preserved",
    description:
      "A neighborhood that survived the war and the real estate developers both. Cemetery walks, shotengai shopping streets, cats on every corner. The Tokyo that Tokyo forgot to modernize.",
    insiderTip:
      "Yanaka Ginza at dusk, when the shops are closing and the smell of yakitori fills the narrow street, is worth any detour.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=75",
    tags: ["temples", "shopping-street", "cats", "history"],
  },
  {
    slug: "gion",
    name: "Gion",
    nameJa: "祇園",
    city: "kyoto",
    vibe: "Atmospheric & ancient",
    description:
      "Yes, the tourists come. But at 6am and 10pm, Gion belongs to the people who live in it. Cobbled lanes, wooden machiya houses, the sound of wooden sandals. It earns its reputation.",
    insiderTip:
      "Hanamikoji-dori at 7am on a weekday. You might be the only person on the street. Bring a camera. Don't use it.",
    imageUrl:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=75",
    tags: ["geisha-district", "traditional", "nightlife", "restaurants"],
  },
  {
    slug: "namba",
    name: "Namba",
    nameJa: "難波",
    city: "osaka",
    vibe: "Loud, human, alive",
    description:
      "The beating heart of Osaka. Overwhelming at first, then familiar, then something close to home. Street food, arcade sounds, the mechanical crab, and somehow underneath all of it, a genuine warmth.",
    insiderTip:
      "The ramen shops in the alleys east of Dotonbori — away from the canal — have lower prices and no queues. Locals eat there. Tourists eat near the water.",
    imageUrl:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=75",
    tags: ["street-food", "nightlife", "shopping", "entertainment"],
  },
];

export const insiderTips: InsiderTip[] = [
  {
    id: "tip-1",
    city: "tokyo",
    category: "daily-life",
    tip: "Your local konbini is your second home. Learn the staff's faces. Smile. They remember.",
    context: "From James, 5 years in Shinjuku",
  },
  {
    id: "tip-2",
    city: "all",
    category: "daily-life",
    tip: "Japan runs on cash. Keep ¥10,000 on you at all times. Not every restaurant takes cards, and the moment you're caught without cash will be embarrassing.",
    context: "From Sarah, 3 years in Tokyo",
  },
  {
    id: "tip-3",
    city: "kyoto",
    category: "neighborhoods",
    tip: "Live north of Oike-dori and east of Kawaramachi-dori. Tourist Kyoto is south. Real Kyoto is everywhere else.",
    context: "From Marcus, 2 years in Kyoto",
  },
  {
    id: "tip-4",
    city: "all",
    category: "language",
    tip: "The most useful Japanese phrase is not 'sumimasen'. It's knowing when to bow and when to be silent. Language is 30% words.",
    context: "From Elena, language student",
  },
  {
    id: "tip-5",
    city: "osaka",
    category: "food",
    tip: "Osaka locals eat standing up and fast. If a ramen shop has no chairs, that's a good sign, not a bad one.",
    context: "From David, 6 years in Namba",
  },
  {
    id: "tip-6",
    city: "all",
    category: "housing",
    tip: "Get a guarantor service if you don't have a Japanese guarantor. They cost money (usually one month's rent) but open 80% of apartments that would otherwise reject foreign applicants.",
    context: "Community advice — confirmed by multiple members",
  },
];

export function getNeighborhoodsByCity(citySlug: string): Neighborhood[] {
  return neighborhoods.filter((n) => n.city === citySlug);
}

export function getFeaturedVoices(count = 3): CommunityVoice[] {
  return communityVoices.slice(0, count);
}

export function getTipsByCity(citySlug: string): InsiderTip[] {
  return insiderTips.filter((t) => t.city === citySlug || t.city === "all");
}
