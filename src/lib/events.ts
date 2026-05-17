import type { FragmentMood } from "./postcards";

export type EventCategory =
  | "cafe-session"
  | "market"
  | "live-music"
  | "exhibition"
  | "neighborhood"
  | "sports"
  | "language-exchange"
  | "discovery"
  | "popup";

// "daily" = any day, "weekends" = sat+sun, "weekdays" = mon-fri
export type EventDay =
  | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
  | "weekdays" | "weekends" | "daily";

export interface DailyEvent {
  id: string;
  title: string;
  hook: string;         // One sentence — the emotional reason to go
  description: string;  // 2-3 sentences. Honest, not promotional.
  venue: string;
  neighborhood: string;
  city: "tokyo" | "kyoto" | "osaka";
  coordinates: [number, number];
  category: EventCategory;
  startTime: string;    // "09:00" 24h
  endTime?: string;     // "17:00"
  days: EventDay[];
  price?: string;       // "free" | "¥500" | "¥1,500–3,000"
  imageUrl: string;
  mood: FragmentMood;
  tags: string[];
  isPremium?: boolean;
}

export const eventCategoryMeta: Record<EventCategory, { color: string; label: string }> = {
  "cafe-session":      { color: "#C9A96E", label: "Café session" },
  "market":            { color: "#C87D6B", label: "Market" },
  "live-music":        { color: "#8B7E9E", label: "Live music" },
  "exhibition":        { color: "#7B8DB3", label: "Exhibition" },
  "neighborhood":      { color: "#7A9E7E", label: "Neighborhood" },
  "sports":            { color: "#6B9E8A", label: "Sports" },
  "language-exchange": { color: "#A8B5A0", label: "Language exchange" },
  "discovery":         { color: "#D4A96E", label: "Discovery" },
  "popup":             { color: "#D4A5B5", label: "Pop-up" },
};

export const allEvents: DailyEvent[] = [
  // ── TOKYO: WEEKENDS ────────────────────────────────────────────────
  {
    id: "koenji-morning-market",
    title: "Kōenji Morning Market",
    hook: "Old things at honest prices, before the tourists find out about Shimokitazawa.",
    description: "A weekend flea market outside Kōenji station with vendors selling records, clothes, ceramics, and things with no obvious purpose. The market runs from 9am and most of the good finds are gone by noon. Cash only. No English needed — pointing works perfectly.",
    venue: "Kōenji Station South Plaza",
    neighborhood: "Kōenji",
    city: "tokyo",
    coordinates: [35.7059, 139.6501],
    category: "market",
    startTime: "09:00",
    endTime: "15:00",
    days: ["sat", "sun"],
    price: "free entry",
    imageUrl: "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?w=800&q=75",
    mood: "wandering",
    tags: ["flea-market", "koenji", "records", "vintage", "weekend"],
  },
  {
    id: "shimokitazawa-vintage-browsing",
    title: "Shimokitazawa Vintage Walk",
    hook: "Two hours of looking at other people's old things without pressure to buy anything.",
    description: "Shimokitazawa has more vintage clothing shops per block than anywhere in Tokyo. Most are small, independently run, and staffed by people who are genuinely interested in clothes. Weekend afternoons are busy but still manageable. You don't need to speak Japanese to shop here.",
    venue: "Shimokitazawa south side shopping area",
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6614, 139.6682],
    category: "discovery",
    startTime: "12:00",
    endTime: "20:00",
    days: ["weekends"],
    price: "free entry",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=75",
    mood: "wandering",
    tags: ["shimokitazawa", "vintage", "shopping", "afternoon", "weekend"],
  },
  {
    id: "yoyogi-park-sunday",
    title: "Yoyogi Park Sundays",
    hook: "Every Sunday, the park becomes a hundred different social lives you can walk through.",
    description: "Yoyogi Park on Sunday is consistently one of the most genuinely interesting places in Tokyo. Bands practicing, groups dancing, people doing nothing in particular, drum circles, couples, dogs. You can stay for forty minutes or four hours. Nobody will ask you anything.",
    venue: "Yoyogi Park",
    neighborhood: "Harajuku / Yoyogi",
    city: "tokyo",
    coordinates: [35.6715, 139.6953],
    category: "neighborhood",
    startTime: "10:00",
    endTime: "17:00",
    days: ["sun"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=75",
    mood: "belonging",
    tags: ["yoyogi", "park", "sunday", "people", "free"],
  },
  {
    id: "nishi-ogikubo-antiques",
    title: "Nishi-Ogikubo Antique Street",
    hook: "The antique district that makes you realize how much of the past Tokyo has kept.",
    description: "Nishi-Ogikubo has a cluster of antique and used furniture shops that most foreigners never discover. The shops sell everything from Showa-era appliances to mid-century furniture to vintage ceramics. Nothing is cheap, but looking is free. The walk from the station is pleasant and takes you through a genuinely residential neighborhood.",
    venue: "Nishi-Ogikubo antique district",
    neighborhood: "Nishi-Ogikubo",
    city: "tokyo",
    coordinates: [35.7037, 139.5995],
    category: "market",
    startTime: "11:00",
    endTime: "18:00",
    days: ["sat"],
    price: "free entry",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=75",
    mood: "wandering",
    tags: ["antiques", "nishi-ogikubo", "shopping", "saturday", "local"],
  },
  {
    id: "kagurazaka-sunday-stroll",
    title: "Kagurazaka Sunday Morning",
    hook: "The Tokyo neighborhood that looks like Paris moved to Edo and neither of them minded.",
    description: "Kagurazaka on Sunday morning before noon is quiet enough to actually look at things. The narrow lanes called yokocho have French bistros next to traditional Japanese restaurants next to bakeries. A good place to have a coffee and feel like you've chosen your life deliberately.",
    venue: "Kagurazaka main street and side lanes",
    neighborhood: "Kagurazaka",
    city: "tokyo",
    coordinates: [35.7016, 139.7410],
    category: "neighborhood",
    startTime: "09:00",
    endTime: "13:00",
    days: ["sun"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=75",
    mood: "quiet",
    tags: ["kagurazaka", "sunday", "morning", "café", "lanes"],
  },

  // ── TOKYO: WEEKDAY EVENINGS ─────────────────────────────────────────
  {
    id: "shimokitazawa-live-music",
    title: "Live Music in Shimokitazawa",
    hook: "Small venues where you're close enough to see the guitarist's hands.",
    description: "Shimokitazawa has dozens of live music venues, most of them small enough that there are no bad seats. Friday and Saturday evenings have the most shows — J-rock, indie folk, electronic, jazz. Tickets are usually ¥1,500–3,000 with a drink minimum. The venues are concentrated in the south side around the new station building.",
    venue: "Shimokitazawa live venues (various)",
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6609, 139.6678],
    category: "live-music",
    startTime: "19:00",
    endTime: "23:00",
    days: ["fri", "sat"],
    price: "¥1,500–3,000",
    imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=75",
    mood: "belonging",
    tags: ["shimokitazawa", "live-music", "evening", "bands", "friday", "saturday"],
  },
  {
    id: "koenji-jazz-bar",
    title: "Jazz Bar, Kōenji Backstreets",
    hook: "You don't have to know anything about jazz to sit here and feel like you do.",
    description: "There are several small jazz bars in the backstreets north of Kōenji station. They're the kind of places that feel like they've been playing since 1974 and have no intention of stopping. Drinks are reasonably priced. The bartenders are serious about the music. Showing up alone is perfectly normal and possibly preferred.",
    venue: "Kōenji north side jazz bars",
    neighborhood: "Kōenji",
    city: "tokyo",
    coordinates: [35.7061, 139.6499],
    category: "live-music",
    startTime: "20:00",
    endTime: "00:00",
    days: ["thu", "fri", "sat"],
    price: "¥500–1,500 + drinks",
    imageUrl: "https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=800&q=75",
    mood: "solitude",
    tags: ["jazz", "koenji", "evening", "bar", "music", "alone"],
  },
  {
    id: "golden-gai-evening",
    title: "Shinjuku Golden Gai",
    hook: "Two hundred tiny bars. Pick one. Stay longer than you planned.",
    description: "Golden Gai is six lanes of small bars, most with fewer than ten seats. Each bar has its own personality, its own regulars, its own logic. Some explicitly welcome foreigners; some are regulars-only. The ones with English menus or English signs are happy to have you. Best approached with no plan and nowhere to be.",
    venue: "Shinjuku Golden Gai",
    neighborhood: "Shinjuku",
    city: "tokyo",
    coordinates: [35.6942, 139.7037],
    category: "neighborhood",
    startTime: "19:00",
    days: ["daily"],
    price: "¥500–1,500 per bar",
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=75",
    mood: "belonging",
    tags: ["golden-gai", "shinjuku", "bars", "evening", "solo"],
  },
  {
    id: "nakameguro-canal-evening",
    title: "Nakameguro Canal Walk",
    hook: "The canal walk you've seen in photos is better than the photos.",
    description: "The Meguro River canal path is most enjoyable on weekday evenings when it's less crowded. Small restaurants and bars line both sides of the water. Best to walk the full stretch one direction and pick somewhere for a drink on the way back. In spring the cherry blossoms make it genuinely overwhelming.",
    venue: "Meguro River canal path",
    neighborhood: "Nakameguro",
    city: "tokyo",
    coordinates: [35.6406, 139.6980],
    category: "neighborhood",
    startTime: "18:00",
    days: ["daily"],
    price: "free to walk",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=75",
    mood: "quiet",
    tags: ["nakameguro", "canal", "evening", "walk", "bars"],
  },
  {
    id: "language-exchange-cafe",
    title: "Language Exchange at CAFÉ PAUSE",
    hook: "An hour of Japanese practice with someone who wants to practice their English.",
    description: "Language exchanges happen at various cafés in Shimokitazawa and Shinjuku on weekday evenings. The format is simple: you speak Japanese for twenty minutes, they speak English for twenty minutes. It's organized enough to not be awkward and loose enough to become a real conversation. Most participants are in their twenties.",
    venue: "Various cafés, Shimokitazawa / Shinjuku",
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6615, 139.6685],
    category: "language-exchange",
    startTime: "18:30",
    endTime: "21:00",
    days: ["mon", "wed"],
    price: "free + drink",
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=75",
    mood: "belonging",
    tags: ["language-exchange", "japanese", "practice", "social", "weekday"],
  },

  // ── TOKYO: MORNING / DAILY ──────────────────────────────────────────
  {
    id: "sensoji-before-9am",
    title: "Senso-ji Before 9am",
    hook: "The most visited temple in Japan, and before 9am it belongs to the people who live near it.",
    description: "Senso-ji in Asakusa receives millions of visitors a year. Before 9am, it belongs almost entirely to locals — elderly residents doing their morning walk, vendors setting up, the occasional early photographer. The temple grounds in early light have a quality that's hard to find elsewhere in the city. Get on the train at 7.",
    venue: "Senso-ji Temple, Asakusa",
    neighborhood: "Asakusa",
    city: "tokyo",
    coordinates: [35.7148, 139.7967],
    category: "discovery",
    startTime: "07:00",
    endTime: "09:00",
    days: ["daily"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=75",
    mood: "quiet",
    tags: ["asakusa", "sensoji", "morning", "temple", "early"],
  },
  {
    id: "yanaka-ginza-morning",
    title: "Yanaka Ginza Morning",
    hook: "The shopping street that survived the war and the developers both — best before the weekend crowds.",
    description: "Yanaka Ginza is a 170-meter covered shopping street that runs through one of Tokyo's few remaining pre-war neighborhoods. The shops sell fish, pickles, sweets, and wooden objects. Weekday mornings, it's almost entirely locals. The covered arcade smell is particular — yakitori, cedar, something old. Worth the train ride.",
    venue: "Yanaka Ginza shopping street",
    neighborhood: "Yanaka",
    city: "tokyo",
    coordinates: [35.7264, 139.7680],
    category: "neighborhood",
    startTime: "09:00",
    endTime: "12:00",
    days: ["daily"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=75",
    mood: "anchored",
    tags: ["yanaka", "shotengai", "morning", "old-tokyo", "walking"],
  },
  {
    id: "ueno-park-afternoon",
    title: "Ueno Park and Museum Row",
    hook: "Four world-class museums, a pond, a zoo, and enough shade to stay all afternoon.",
    description: "Ueno Park is one of those places that rewards showing up without a plan. The Tokyo National Museum, the National Museum of Western Art, the Tokyo Metropolitan Art Museum, and the Ueno Zoo are all within walking distance of each other. Pick one, or just sit by Shinobazu Pond and watch the boats. The park is free; the museums are not.",
    venue: "Ueno Park and museum complex",
    neighborhood: "Ueno",
    city: "tokyo",
    coordinates: [35.7151, 139.7755],
    category: "exhibition",
    startTime: "10:00",
    endTime: "17:00",
    days: ["daily"],
    price: "free park, ¥620–2,000 museums",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=75",
    mood: "wandering",
    tags: ["ueno", "museum", "park", "afternoon", "culture"],
  },
  {
    id: "shimokitazawa-record-shopping",
    title: "Record Shopping in Shimokitazawa",
    hook: "Spend an afternoon in basements looking at records you won't buy but will think about.",
    description: "Shimokitazawa has more independent record shops than any comparable neighborhood in the city. Most are basement-level, reasonably priced, and organized in a way that requires exploration rather than search. The owners tend to play interesting selections. You don't need to be a serious collector — browsing is normal and welcome.",
    venue: "Shimokitazawa record shops (various)",
    neighborhood: "Shimokitazawa",
    city: "tokyo",
    coordinates: [35.6612, 139.6680],
    category: "discovery",
    startTime: "13:00",
    endTime: "20:00",
    days: ["daily"],
    price: "free to browse",
    imageUrl: "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?w=800&q=75",
    mood: "wandering",
    tags: ["shimokitazawa", "records", "music", "shopping", "afternoon"],
  },
  {
    id: "arakawa-embankment-walk",
    title: "Arakawa River Evening Walk",
    hook: "A quiet river path in the city where nobody is going somewhere important.",
    description: "The Arakawa embankment has a multi-kilometer walking and cycling path with almost no tourists and a good view of the sky. Best in the evenings when the light is low. The neighborhood on either side is residential and unpretentious. A good place to walk for an hour without needing to decide anything.",
    venue: "Arakawa river embankment path",
    neighborhood: "Arakawa",
    city: "tokyo",
    coordinates: [35.7547, 139.8423],
    category: "discovery",
    startTime: "17:00",
    days: ["daily"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=75",
    mood: "quiet",
    tags: ["arakawa", "river", "walking", "evening", "quiet"],
  },

  // ── TOKYO: EXHIBITIONS / CULTURE ────────────────────────────────────
  {
    id: "tokyo-photographic-art-museum",
    title: "Tokyo Photographic Art Museum",
    hook: "The best photography museum in Tokyo, and almost nobody in your school knows about it.",
    description: "TOP (Tokyo Photographic Art Museum) in Yebisu Garden Place runs multiple exhibitions simultaneously across four floors. The collection rotates regularly with both Japanese and international photographers. On Saturday evenings it's open until 8pm, which makes it a viable after-work destination. Yebisu itself is a pleasant area to walk afterward.",
    venue: "Tokyo Photographic Art Museum, Yebisu",
    neighborhood: "Ebisu / Yebisu",
    city: "tokyo",
    coordinates: [35.6350, 139.7163],
    category: "exhibition",
    startTime: "10:00",
    endTime: "18:00",
    days: ["tue", "wed", "thu", "fri", "sat", "sun"],
    price: "¥500–900",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=75",
    mood: "adrift",
    tags: ["photography", "museum", "yebisu", "exhibition", "culture"],
  },
  {
    id: "21-21-design-sight",
    title: "21_21 Design Sight",
    hook: "A design museum where the building itself is the first exhibit.",
    description: "21_21 Design Sight in Tokyo Midtown is one of those spaces where the architecture and the exhibition feel like a single argument. The exhibitions change regularly and are almost always worth an hour. The surrounding Midtown complex has good places to sit outside if it's a reasonable day.",
    venue: "21_21 Design Sight, Tokyo Midtown",
    neighborhood: "Roppongi / Akasaka",
    city: "tokyo",
    coordinates: [35.6656, 139.7297],
    category: "exhibition",
    startTime: "11:00",
    endTime: "20:00",
    days: ["tue", "wed", "thu", "fri", "sat", "sun"],
    price: "¥1,400",
    imageUrl: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?w=800&q=75",
    mood: "adrift",
    tags: ["design", "museum", "midtown", "roppongi", "culture"],
  },

  // ── KYOTO ────────────────────────────────────────────────────────────
  {
    id: "kamo-river-morning-kyoto",
    title: "Kamo River Morning Walk",
    hook: "The reason people who came to Kyoto for a week ended up staying a year.",
    description: "The Kamo River has a paved path running north from the city center. Before 9am it's almost exclusively locals — dog walkers, runners, elderly couples, students on bicycles. The herons stand in the shallows regardless of weather. Any morning, any season, it is reliably calming.",
    venue: "Kamo River riverside path",
    neighborhood: "Kamo riverside",
    city: "kyoto",
    coordinates: [35.0116, 135.7681],
    category: "discovery",
    startTime: "06:30",
    endTime: "10:00",
    days: ["daily"],
    price: "free",
    imageUrl: "https://images.unsplash.com/photo-1493330551839-704f8fbd7e9b?w=800&q=75",
    mood: "quiet",
    tags: ["kamo-river", "morning", "kyoto", "walking", "herons"],
  },
  {
    id: "nishiki-market-morning",
    title: "Nishiki Market Before Noon",
    hook: "The five-block market that has been selling Kyoto to itself since the 1300s.",
    description: "Nishiki Market is a narrow covered arcade with over a hundred stalls selling pickles, tofu, knives, fresh vegetables, and Kyoto specialties. Weekday mornings are when the locals shop — before noon you're among people who actually use the market, not just photograph it. Tasting samples are freely offered at most stalls.",
    venue: "Nishiki Market, Nakagyo-ku",
    neighborhood: "Central Kyoto",
    city: "kyoto",
    coordinates: [35.0052, 135.7670],
    category: "market",
    startTime: "09:00",
    endTime: "12:00",
    days: ["weekdays"],
    price: "free entry",
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=75",
    mood: "belonging",
    tags: ["nishiki", "market", "kyoto", "morning", "food", "local"],
  },

  // ── OSAKA ────────────────────────────────────────────────────────────
  {
    id: "shinsekai-evening-walk",
    title: "Shinsekai Evening Walk",
    hook: "The part of Osaka that got left behind by the twentieth century and is fine with it.",
    description: "Shinsekai is a neighborhood that was built as a futuristic entertainment district in 1912 and has been updating slowly since. The kushikatsu shops have been in the same family for three generations. The Tsutenkaku tower lights up at night. The area is quiet by Osaka standards, which means it is louder than almost anywhere else in Japan.",
    venue: "Shinsekai neighborhood",
    neighborhood: "Shinsekai",
    city: "osaka",
    coordinates: [35.6512, 135.5063],
    category: "neighborhood",
    startTime: "18:00",
    days: ["daily"],
    price: "free to walk, ¥800–1,500 for food",
    imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=75",
    mood: "belonging",
    tags: ["shinsekai", "osaka", "evening", "kushikatsu", "local"],
  },
  {
    id: "namba-backstreet-lunch",
    title: "Namba Backstreet Lunch",
    hook: "The restaurants three blocks from the canal, where you eat with people who live here.",
    description: "The streets around Dotonbori that don't face the water are where Osaka's working lunch happens. Ramen shops, teishoku restaurants, gyoza counters, standing sushi. Most have plastic food displays or photo menus. The rhythm of a Namba lunch hour — noisy, fast, generous — is worth experiencing even if you only order rice.",
    venue: "Namba backstreets, south of Dotonbori",
    neighborhood: "Namba",
    city: "osaka",
    coordinates: [34.6658, 135.5045],
    category: "neighborhood",
    startTime: "11:30",
    endTime: "14:00",
    days: ["weekdays"],
    price: "¥600–1,200",
    imageUrl: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=75",
    mood: "belonging",
    tags: ["namba", "osaka", "lunch", "local", "ramen"],
  },
];

// ── Day helpers ────────────────────────────────────────────────────────

const DAY_KEYS: EventDay[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function getEventsForDay(dayIndex: number, city?: string): DailyEvent[] {
  const dayKey = DAY_KEYS[dayIndex];
  const isWeekend = dayIndex === 0 || dayIndex === 6;
  const isWeekday = !isWeekend;

  return allEvents
    .filter((e) => {
      if (city && e.city !== city) return false;
      return (
        e.days.includes("daily") ||
        e.days.includes(dayKey) ||
        (isWeekend && e.days.includes("weekends")) ||
        (isWeekday && e.days.includes("weekdays"))
      );
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function groupEventsByPeriod(events: DailyEvent[]) {
  return {
    morning:   events.filter((e) => e.startTime < "12:00"),
    afternoon: events.filter((e) => e.startTime >= "12:00" && e.startTime < "17:00"),
    evening:   events.filter((e) => e.startTime >= "17:00"),
  };
}

export function getAfterWorkEvent(events: DailyEvent[]): DailyEvent | null {
  return (
    events.find(
      (e) => e.startTime >= "17:00" && e.startTime <= "20:00" && e.city === "tokyo"
    ) ?? null
  );
}

export function tokyoHour(): number {
  // UTC+9 approximation
  return (new Date().getUTCHours() + 9) % 24;
}
