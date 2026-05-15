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

// ── Survival truths ──────────────────────────────────
export type SurvivalUrgency = "day-one" | "week-one" | "month-one" | "ongoing";

export interface SurvivalTruth {
  id: string;
  number: number;
  urgency: SurvivalUrgency;
  title: string;
  hook: string;
  body: string;
}

export const survivalTruths: SurvivalTruth[] = [
  {
    id: "address-circle",
    number: 1,
    urgency: "day-one",
    title: "The address circle must be done in exact order",
    hook: "City Hall first. Everything else is locked behind it.",
    body: "You cannot open a bank account without a residence card. You cannot get a residence card without registering your address at City Hall within 14 days of arrival. You cannot register your address at City Hall without your passport and visa. The sequence is: land → City Hall → residence card → bank account → everything else. Doing it out of order costs weeks.",
  },
  {
    id: "three-month-wall",
    number: 2,
    urgency: "month-one",
    title: "Month three is when most people break",
    hook: "The novelty ends. The loneliness begins. It's survivable.",
    body: "The first weeks are adrenaline. Everything is new and interesting enough to carry you. Around month three, the adrenaline runs out and reality arrives: you have no close friends yet, your Japanese isn't working the way you hoped, and the city is indifferent. This is normal. Almost everyone goes through it. The people who stay are the ones who knew it was coming.",
  },
  {
    id: "silence-not-disapproval",
    number: 3,
    urgency: "week-one",
    title: "Silence is not disapproval",
    hook: "They're thinking. Not rejecting you.",
    body: "In most Western cultures, silence in conversation means something is wrong. In Japan, a long pause before someone answers often means they're taking your question seriously. Rushing to fill silence reads as anxiety and can make the other person feel their thoughtfulness is unwanted. Let it breathe. The answer is coming.",
  },
  {
    id: "keigo-hierarchy",
    number: 4,
    urgency: "month-one",
    title: "Using casual Japanese to seniors signals you don't respect hierarchy",
    hook: "Register mistakes aren't just grammar errors. They're social ones.",
    body: "Japanese has formal registers (keigo) used with bosses, teachers, strangers, and anyone older. Using plain form (友達語) with a senpai or manager is like calling your professor by their first name on day one — it signals you're claiming equal standing. Nobody will correct you directly. They'll just become slightly more formal and slightly more distant. Learn keigo early, even imperfectly.",
  },
  {
    id: "eating-alone",
    number: 5,
    urgency: "day-one",
    title: "Eating alone is not sad here. It's infrastructure.",
    hook: "Counter seating exists for a reason.",
    body: "Japan has an entire culture built around solo dining. Ramen shops have counter seats specifically for single diners. Most sushi bars are designed for one. Convenience stores exist so you can eat a full meal standing at 11pm without anyone thinking anything of it. You will never feel judged for eating alone in Japan. It may be the most socially comfortable country in the world for solitude.",
  },
  {
    id: "konbini-infrastructure",
    number: 6,
    urgency: "day-one",
    title: "The convenience store is not a convenience store",
    hook: "It's a bank, a pharmacy, a post office, a hot meal, and a social neutral zone.",
    body: "You can pay your electricity bill at a konbini. You can withdraw cash (7-Eleven ATMs accept foreign cards; most Japanese ATMs don't). You can send packages, print documents, buy medicine, eat a full hot meal, and sit at a table without anyone making you feel like you have to leave. In a city where public sitting space is scarce, the konbini is infrastructure.",
  },
  {
    id: "line-not-optional",
    number: 7,
    urgency: "week-one",
    title: "LINE is not optional",
    hook: "If your employer, school, or friends are Japanese, you will use LINE or you will be excluded.",
    body: "Japan runs on LINE the way the US runs on iMessage and Europe runs on WhatsApp. Work groups, school announcements, event coordination, apartment lease communication — it all happens on LINE. Not having it or checking it slowly means missing things. There's also a timing norm: messages sent in the evening are generally replied to the next morning, not immediately. Read receipts are visible, which creates its own social pressure.",
  },
  {
    id: "foreigner-network",
    number: 8,
    urgency: "month-one",
    title: "There is a foreigner network. It takes effort to find.",
    hook: "It exists in every city. It is the difference between surviving and belonging.",
    body: "Every major Japanese city has overlapping communities of long-term foreign residents — expat Facebook groups, meetup.com language exchanges, international bars that became community hubs, subreddit threads turned real friendships. These networks feel secondary to 'really living in Japan,' but they are where most people find their footing. Your first Japanese friends will often come after your first foreign-resident friends give you the confidence to try.",
  },
];
