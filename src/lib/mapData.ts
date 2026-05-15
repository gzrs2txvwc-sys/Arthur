export type PinCategory =
  | "memory"
  | "loneliness"
  | "belonging"
  | "survival"
  | "discovery"
  | "milestone";

export interface MapPin {
  id: string;
  coordinates: [number, number]; // [lat, lng]
  category: PinCategory;
  city: "tokyo" | "kyoto" | "osaka" | "other";
  title: string;
  subtitle: string;
  story: string;
  imageUrl: string;
  attribution?: string;
  year?: string;
  tags: string[];
}

export const categoryMeta: Record<
  PinCategory,
  { label: string; color: string; glow: string; description: string }
> = {
  memory: {
    label: "Memories",
    color: "#e94560",
    glow: "rgba(233,69,96,0.4)",
    description: "Moments burned into memory",
  },
  loneliness: {
    label: "Loneliness",
    color: "#6B7FDB",
    glow: "rgba(107,127,219,0.4)",
    description: "The honest difficult hours",
  },
  belonging: {
    label: "Belonging",
    color: "#4ECDC4",
    glow: "rgba(78,205,196,0.4)",
    description: "Where it finally felt like home",
  },
  survival: {
    label: "Survival",
    color: "#C9A96E",
    glow: "rgba(201,169,110,0.4)",
    description: "What kept you going",
  },
  discovery: {
    label: "Discovery",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.4)",
    description: "Hidden spots no guidebook shows",
  },
  milestone: {
    label: "Milestones",
    color: "#A8E6CF",
    glow: "rgba(168,230,207,0.4)",
    description: "The moments that changed everything",
  },
};

export const mapPins: MapPin[] = [
  // ── TOKYO ──────────────────────────────────────
  {
    id: "shibuya-first-day",
    coordinates: [35.6595, 139.7004],
    category: "memory",
    city: "tokyo",
    title: "Shibuya Crossing, First Week",
    subtitle: "The day Tokyo felt real — and terrifying",
    story:
      "I stood at Shibuya Crossing for twenty minutes without crossing. Just watching. Five hundred people moving in every direction, perfectly, without collision. I had come from a country where people bumped into each other constantly. Here, no one touched. I didn't know if that was beautiful or lonely. It took me a year to understand it was both.",
    imageUrl:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80",
    attribution: "From a high school arrival story",
    year: "2018",
    tags: ["first-week", "overwhelmed", "tokyo"],
  },
  {
    id: "shinjuku-3am",
    coordinates: [35.6938, 139.7034],
    category: "loneliness",
    city: "tokyo",
    title: "Shinjuku, 3am on a Tuesday",
    subtitle: "The specific loneliness of a city that won't sleep with you",
    story:
      "Second year. The euphoria had worn off and I was standing in Kabukicho at 3am because my apartment felt too small to be sad in. The lights were still on everywhere. Hostess clubs, ramen shops, a man sleeping standing up against a vending machine. I bought a corn soup. The can was warm. I held it with both hands for a long time. Nobody looked at me. I was completely invisible and completely safe — which is its own kind of loneliness.",
    imageUrl:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80",
    attribution: "Contributed by James, 5 years in Shinjuku",
    year: "2020",
    tags: ["night", "loneliness", "year-two", "shinjuku"],
  },
  {
    id: "shimokitazawa-belonging",
    coordinates: [35.6614, 139.6682],
    category: "belonging",
    city: "tokyo",
    title: "Shimokitazawa Record Shop",
    subtitle: "The first place in Japan that made room for me",
    story:
      "I found it by accident — a basement record shop in Shimokitazawa where the owner played Joni Mitchell at noon and nobody thought that was strange. I started going every Saturday. I didn't speak enough Japanese. He didn't speak English. We communicated through records he pulled from shelves and placed on the turntable, watching my face. This went on for three months before I understood this was friendship.",
    imageUrl:
      "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?w=1200&q=80",
    attribution: "From a personal journal, year one",
    year: "2019",
    tags: ["shimokitazawa", "music", "belonging", "friendship"],
  },
  {
    id: "koenji-missed-stop",
    coordinates: [35.7059, 139.6492],
    category: "milestone",
    city: "tokyo",
    title: "Kōenji Station Platform",
    subtitle: "I used the wrong verb. The room understood something I didn't.",
    story:
      "It happened in a role-play exercise. I was the new employee; my classmate was the section chief. I'd rehearsed my lines — including itadaku, the humble form for 'receive,' the one you use when you want to show the other person is above you. In the room I said morau instead. Casual register, like talking to a friend. The teacher paused the exercise and explained: using the wrong register with a superior doesn't read as a language mistake. It reads as a claim of equality. The room went quiet in the way Japanese rooms go quiet when something has been understood by everyone at once. On the Chuo line I missed Koenji and ended up at Ogikubo. A woman put a packet of tissues on the seat beside me without looking. In Japan, you don't intrude on someone's feelings. But you notice. I've thought about that tissue packet more than almost anything else from that year.",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    attribution: "Personal, high school year two",
    year: "2019",
    tags: ["keigo", "school", "train", "kindness", "milestone"],
  },
  {
    id: "harajuku-konbini",
    coordinates: [35.6702, 139.7027],
    category: "survival",
    city: "tokyo",
    title: "Harajuku Konbini, 11pm",
    subtitle: "The convenience store that was my second home",
    story:
      "There is a specific konbini near Harajuku that I went to every night for six months. Same time, same items: tuna onigiri, melon pan if they had it, a small coffee. The staff knew my order. They never said anything about it. But one night the usual woman put a small seasonal snack next to my change with the briefest nod. I went home and looked up how to say 'I appreciate you' in Japanese. It took me four days to say it correctly.",
    imageUrl:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    attribution: "From a personal journal",
    year: "2018",
    tags: ["konbini", "survival", "daily-life", "harajuku"],
  },
  {
    id: "ikebukuro-school",
    coordinates: [35.7295, 139.7109],
    category: "loneliness",
    city: "tokyo",
    title: "High School Entrance Ceremony",
    subtitle: "90 minutes in a gymnasium. I understood half the words, none of the silence.",
    story:
      "The entrance ceremony was in the gymnasium, April, everyone in black and white. The principal spoke for thirty minutes in formal Japanese I could parse maybe forty percent of. I sat in the third row arranging my face into the expression of someone who understood. What I hadn't known about Japanese schools was the silence — there's a grammar to it. Who bows first, who walks through the door last, who waits for the teacher to sit. For three weeks I kept going first: first through the door, first to sit, first to speak. Nobody corrected me. They just waited. The student beside me at the ceremony had slid her printed program over so I could follow along. When the speeches ended she took it back and never mentioned it. She hadn't done it out of pity. I understood that later — much later.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    attribution: "Personal, high school arrival",
    year: "2018",
    tags: ["high-school", "ceremony", "hierarchy", "silence", "loneliness"],
  },
  {
    id: "yanaka-discovery",
    coordinates: [35.7264, 139.7680],
    category: "discovery",
    city: "tokyo",
    title: "Yanaka Ginza at Dusk",
    subtitle: "The Tokyo that Tokyo forgot to modernize",
    story:
      "Nobody told me about Yanaka. I found it following a cat. The shopping street smells of yakitori and wood and old things. The buildings haven't been replaced because they survived the war. An old man was closing his shop — a shop that sold nothing but wooden combs — and he saw me looking and unlocked the door and let me in for five minutes. He showed me how each comb was different. I bought one. I still have it.",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=80",
    attribution: "Discovered year two",
    year: "2019",
    tags: ["yanaka", "hidden", "old-tokyo", "discovery"],
  },

  // ── KYOTO ──────────────────────────────────────
  {
    id: "fushimi-inari-dawn",
    coordinates: [34.9671, 135.7727],
    category: "milestone",
    city: "kyoto",
    title: "Fushimi Inari, 5:40am",
    subtitle: "The first morning I stopped trying to understand Japan and started feeling it",
    story:
      "I had set an alarm for 5:15 because someone online said go early. I almost didn't. I was tired and lonely and three months into a language program that was humbling me daily. But I went. At 6am, in the first gate corridor, completely alone, the light came through the lacquer in a way that made me stop walking. I stood there for a long time. I wasn't thinking about Japanese grammar. I wasn't thinking about anything. That was the beginning of something.",
    imageUrl:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&q=80",
    attribution: "Contributed by Marcus, PhD student",
    year: "2022",
    tags: ["fushimi-inari", "dawn", "peace", "milestone", "kyoto"],
  },
  {
    id: "kamo-river-phone-call",
    coordinates: [35.0116, 135.7681],
    category: "loneliness",
    city: "kyoto",
    title: "Kamo River, Sunset",
    subtitle: "Called my mother and couldn't explain why I was crying",
    story:
      "It was the six-month point. Everyone said six months was when it got better. It didn't feel better. I sat on the riverbank near Sanjo and called home. My mother asked how Japan was and I said 'big' and couldn't say anything else for a while. We stayed on the phone for an hour without talking much. The river was doing something beautiful with the light. I didn't tell her that part. I needed to keep something for myself.",
    imageUrl:
      "https://images.unsplash.com/photo-1493330551839-704f8fbd7e9b?w=1200&q=80",
    attribution: "Personal, language school year",
    year: "2021",
    tags: ["kamo-river", "homesick", "six-months", "loneliness"],
  },
  {
    id: "gion-stranger",
    coordinates: [35.0037, 135.7772],
    category: "belonging",
    city: "kyoto",
    title: "A Tea Shop in Gion, 7am",
    subtitle: "The kindest conversation I couldn't fully understand",
    story:
      "I stopped at a tiny tea shop — the kind without a sign, just a暖簾 curtain — and an elderly woman made me matcha without asking what I wanted. She talked to me for twenty minutes. I understood perhaps 60%. I nodded. She laughed at something and I laughed too, not knowing what at. When I left she pressed a small box of sweets into my hands and said something that included the word 遠い — far away. I looked it up on the train. It means 'a long way from home.' She knew.",
    imageUrl:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
    attribution: "Contributed by Elena, language student",
    year: "2023",
    tags: ["gion", "tea", "kindness", "language", "belonging"],
  },
  {
    id: "kyoto-university-interview",
    coordinates: [35.0262, 135.7809],
    category: "milestone",
    city: "kyoto",
    title: "Kyoto University, Main Gate",
    subtitle: "The day I had a full conversation in Japanese and didn't notice until it was over",
    story:
      "The research program interview was forty minutes. My supervisor asked about my methodology, my sources, my relationship to the subject. I answered in Japanese. Not perfect Japanese — I made grammatical errors, I reached for words, I occasionally switched word order incorrectly. But I answered. When I left the building I sat on a bench near the main gate and tried to reconstruct what had happened. I had just done something I couldn't do two years before. I hadn't noticed it happening.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
    attribution: "Personal milestone",
    year: "2023",
    tags: ["university", "japanese", "milestone", "language", "achievement"],
  },

  // ── OSAKA ──────────────────────────────────────
  {
    id: "dotonbori-midnight",
    coordinates: [34.6687, 135.5005],
    category: "belonging",
    city: "osaka",
    title: "Dotonbori at Midnight",
    subtitle: "The first Japanese city that felt like it wanted me there",
    story:
      "Osaka was the first place in Japan where a stranger started a conversation with me unprompted. Not tourist-talk. Real talk. A man in his sixties eating takoyaki from a paper cup asked where I was from, then told me his opinion on the best okonomiyaki in the city, then walked me three blocks to show me the place. He was gone before I finished eating. That interaction would not have happened in Tokyo. It would not have happened in Kyoto. Something is different in Osaka.",
    imageUrl:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1200&q=80",
    attribution: "Contributed by Priya, UX designer",
    year: "2021",
    tags: ["dotonbori", "belonging", "stranger", "warmth", "osaka"],
  },
  {
    id: "escalator-bow",
    coordinates: [35.6930, 139.7006],
    category: "memory",
    city: "tokyo",
    title: "The Escalator Bow",
    subtitle: "I bowed. He bowed back. The escalators carried us past each other.",
    story:
      "Second month. I was on a down escalator in a department store in Shinjuku. I made eye contact with a salaryman on the up escalator. Something in my brain misfired and I bowed — a full thirty-degree bow, the serious kind. He bowed back, immediately, reflexively. We were both mid-bow when the escalators carried us past each other. I went back up to the fourth floor and stood by a rack of ties for a moment. What I hadn't understood yet was that the bow itself wasn't wrong. The bow was fine. Correct, even. What I'd been afraid of — that I'd broken some rule, done something absurd — turned out to be that I'd done something that simply was. That took time to understand. The body learns the country before the mind does.",
    imageUrl:
      "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?w=1200&q=80",
    attribution: "Personal, first months",
    year: "2018",
    tags: ["bow", "etiquette", "department-store", "first-months", "shinjuku"],
  },
  {
    id: "first-japanese-friend",
    coordinates: [35.6406, 139.6980],
    category: "belonging",
    city: "tokyo",
    title: "Nakameguro, Late Afternoon",
    subtitle: "Eight months in. The first time it felt like actual friendship.",
    story:
      "I had been in Japan for eight months before I had what I would call a real friend here. Not a study partner, not someone I ate lunch near — a friend. It happened like this: Kenji had been in my class since September. We had studied together, nodded in hallways, sat near each other in silence. Then one afternoon he sent me a LINE message — just a photo of a coffee shop menu. No text. I sent back a question mark. He sent directions. We sat there for three hours. He spoke Japanese. I replied in broken Japanese and English. At some point I looked up and it had gotten dark outside. He had laughed at three things I said — not politely, actually laughed. That's when I understood. The rules for friendship here are not colder. Just slower. This was the canal where we walked after.",
    imageUrl:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80",
    attribution: "Personal, year one",
    year: "2019",
    tags: ["nakameguro", "friendship", "belonging", "year-one", "line"],
  },
  {
    id: "shinsekai-ramen",
    coordinates: [34.6512, 135.5063],
    category: "survival",
    city: "osaka",
    title: "Standing Ramen, Shinsekai",
    subtitle: "A bowl that cost ¥650 and was worth every year it took to find it",
    story:
      "No chairs. Eight people standing at a counter, eating. The ramen arrived in under two minutes. The broth was the color of old wood and tasted like someone had been thinking about it for a long time. The man next to me — retired, maybe seventy — pushed the red pepper toward me without looking. I used it. He nodded. We ate in the particular companionship of people who have found the right thing. ¥650. No English menu. Worth every moment of language study that led to being able to order it.",
    imageUrl:
      "https://images.unsplash.com/photo-1569518726634-a0b3e23a5a6a?w=1200&q=80",
    attribution: "Contributed by David, chef",
    year: "2020",
    tags: ["ramen", "shinsekai", "food", "survival", "local"],
  },
];

export const mapCenter: [number, number] = [36.5, 137.5];
export const mapDefaultZoom = 6;
