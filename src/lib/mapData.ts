export type PinCategory =
  | "memory"
  | "loneliness"
  | "belonging"
  | "survival"
  | "discovery"
  | "milestone"
  | "practical";

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
  practical: {
    label: "Local Knowledge",
    color: "#7AADCA",
    glow: "rgba(122,173,202,0.4)",
    description: "What only insiders know",
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

  // ── PRACTICAL KNOWLEDGE + EMOTIONAL ────────────
  {
    id: "shinjuku-city-hall",
    coordinates: [35.6945, 139.6975],
    category: "survival",
    city: "tokyo",
    title: "Shinjuku City Hall, Foreign Registration",
    subtitle: "The address. The circle. The stamp.",
    story:
      "You cannot open a bank account without an address. You cannot sign a lease without a bank account. You cannot get a phone contract without a fixed address. This is the circle foreigners discover in their first week. The City Hall in Shinjuku has a foreign registration window staffed by people who have seen the circle ten thousand times. The man at my window had forms in eight languages and a laminated gesture-card for conversations where no common language existed. He corrected three errors on my form without comment. He stamped three things. I left with a residence card. Outside I stood in the sun for a while — not doing anything, just standing there. I had a coordinate in Japan now.",
    imageUrl:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&q=80",
    attribution: "Personal, week one",
    year: "2018",
    tags: ["residence-card", "admin", "shinjuku", "first-week", "survival"],
  },
  {
    id: "ueno-first-restaurant",
    coordinates: [35.7151, 139.7755],
    category: "milestone",
    city: "tokyo",
    title: "Ueno, First Solo Meal",
    subtitle: "I chose it because it had plastic food in the window. I could point.",
    story:
      "The restaurant had a glass case outside with plastic replicas of every dish. I could point. The hostess seated me at a counter. She brought miso soup without my asking — I didn't know it was complimentary, I thought she had guessed I needed it. I pointed to number 7 on the menu. She asked something I didn't understand. I nodded. The right thing arrived. An elderly man across the counter was eating the same thing. He didn't look at me but at some point slid the sesame seeds toward me. I had been about to ask for them. That meal was when I understood that Japan has a language below language — made of attention rather than words. I have been looking for those gestures ever since.",
    imageUrl:
      "https://images.unsplash.com/photo-1580651315530-69c8e0026685?w=1200&q=80",
    attribution: "Personal, month one",
    year: "2018",
    tags: ["ueno", "first-meal", "alone", "kindness", "milestone"],
  },
  {
    id: "shinjuku-language-school",
    coordinates: [35.6872, 139.7038],
    category: "practical",
    city: "tokyo",
    title: "The Language School Corridor, Shinjuku",
    subtitle: "Eight schools in ten minutes. All of them full of people starting over.",
    story:
      "The Japanese language schools cluster in Shinjuku. There are eight of them within a ten-minute walk of each other, each advertising in six languages, each with a placement test, each with the same result: you end up in a room with strangers from places you've never been, all of you trying to say the same word correctly. Level 1 is always full of people who arrived last week. Level 4 is full of people who have been here three years and still can't pass the JLPT. The teacher's name was Tanaka-sensei. She never spoke English to us even in a crisis. When I graduated Level 3 she shook my hand and said something in Japanese I understood completely. That moment took eleven months.",
    imageUrl:
      "https://images.unsplash.com/photo-1574871786514-46e1680ea587?w=1200&q=80",
    attribution: "Contributed by multiple people, various years",
    year: "2019",
    tags: ["japanese-class", "shinjuku", "language-school", "jlpt", "practical"],
  },
  {
    id: "osaka-foreigner-izakaya",
    coordinates: [34.6658, 135.5045],
    category: "belonging",
    city: "osaka",
    title: "The Unmarked Izakaya, Namba Side Streets",
    subtitle: "No sign. A handwritten slip of paper. She doesn't speak English.",
    story:
      "There is an izakaya in the Namba backstreets that became, for a few years, an informal gathering point for Osaka's foreigner community. No sign outside. The entrance is a handwritten slip of paper. It's run by a woman in her seventies who doesn't speak English and doesn't need to. She brings you what she thinks you need. Three beers in, she might bring rice without your asking. She has a look she gives at 10:45pm that is not unkind but is final. I found out about it through a 2019 Facebook post in a group called 'Foreigners in Kansai (Real Talk)' that was somehow still active. The people I met there — a Brazilian dentist, a Senegalese graduate student, a Welsh woman who had been in Osaka for twenty years — I consider some of them family.",
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80",
    attribution: "Contributed by Priya, Namba resident",
    year: "2021",
    tags: ["izakaya", "community", "namba", "belonging", "local-secret"],
  },
  {
    id: "kyoto-river-cycling",
    coordinates: [35.0248, 135.7648],
    category: "discovery",
    city: "kyoto",
    title: "The Kamo River Cycling Route",
    subtitle: "Not on any map for foreigners. You have to get it from someone who stayed.",
    story:
      "Nobody published the Kamo River cycling route for foreigners. It exists because enough people used it over enough years. North from Marutamachi along the eastern bank, past the herons standing still in the shallows, past the students studying on the grass, past the egrets. The path becomes unpaved, then field, then something between field and forest. You can ride it in ninety minutes at a slow pace, or four hours if you stop. I learned about it from a woman in my language class who learned it from the previous year's exchange students. The knowledge passes forward, person to person. That's how most useful knowledge in Kyoto works — not broadcast, not published. Earned.",
    imageUrl:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1200&q=80",
    attribution: "Contributed by Marcus, Kyoto PhD",
    year: "2022",
    tags: ["kyoto", "cycling", "kamo-river", "hidden", "practical"],
  },
  // ── NEW: Raw human traces ──────────────────────────
  {
    id: "3am-familymart",
    coordinates: [35.6938, 139.7034],
    category: "loneliness",
    city: "tokyo",
    title: "3 AM at FamilyMart",
    subtitle: "The night I understood why people stay",
    story:
      "The first time I cried in Japan it was 3am in FamilyMart. I was buying onigiri. The cashier said thank you — that perfect, automatic ありがとうございます — and I realized I hadn't spoken to another person in four days. Not really spoken. Not made actual eye contact. The fluorescent light was making everything look surgical. I paid, walked outside, sat on the curb by the magazine stand, and ate the onigiri in the cold. A salaryman walked past without looking at me. A couple walked past without looking at me. I was completely invisible. I thought: this is either the worst thing about Japan or the best thing, and I genuinely cannot tell which.",
    imageUrl:
      "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=75",
    attribution: "Submitted anonymously, Tokyo",
    year: "2023",
    tags: ["3am", "convenience store", "invisible", "loneliness", "shinjuku"],
  },
  {
    id: "two-ramens-kyoto",
    coordinates: [34.9024, 135.7581],
    category: "memory",
    city: "kyoto",
    title: "Two Ramens in Fushimi",
    subtitle: "What happens when you order wrong and aren't allowed to admit it",
    story:
      "I ordered 二つ when I meant 一つ. It was midnight. The chef was older, wearing a headband, not the kind of person you explain mistakes to. He brought both bowls without any expression and placed them side by side. The steam rose between them. I understood: this was happening. I ate both ramens alone at the counter. The second one got cold halfway through. Nobody said anything. I paid for both and bowed deeply at the door. The chef nodded once. I walked into the Kyoto night feeling both ridiculous and, strangely, like I had passed some kind of test.",
    imageUrl:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=75",
    attribution: "R., 2 years in Kyoto",
    year: "2022",
    tags: ["midnight", "ramen", "mistake", "alone", "fushimi"],
  },
  {
    id: "unnamed-on-the-yamanote",
    coordinates: [35.7298, 139.7110],
    category: "loneliness",
    city: "tokyo",
    title: "Three Months Without My Name",
    subtitle: "What the Yamanote taught me about disappearing",
    story:
      "Three months in, I realized I hadn't heard my name spoken by anyone in Japan. People called me sumimasen when they needed to get past me. Sometimes they didn't say anything at all — just a small movement, a suggestion, and I understood to move. You can become completely unnamed here. Not ignored, exactly. Just unnamed. It changes something in you slowly. I started introducing myself more aggressively, pushing my name into conversations. Then I stopped. Then I bought a notebook and wrote my own name on the first page. Just to see it. I still don't know what that was about.",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=75",
    attribution: "Tobias H., first year in Tokyo",
    year: "2023",
    tags: ["identity", "unnamed", "yamanote", "invisible", "ikebukuro"],
  },
  {
    id: "osaka-wifi-call",
    coordinates: [34.6652, 135.5009],
    category: "milestone",
    city: "osaka",
    title: "The McDonald's Call",
    subtitle: "The first phone call home from Japan — and everything it couldn't hold",
    story:
      "The first time I called my mother from Osaka I was in a McDonald's because the wifi was free and I'd spent two hours trying to connect at the guesthouse. She asked if I was making friends. I said yes because I knew she wouldn't understand 'I'm making acquaintances and the distinction matters enormously here.' She asked if I was eating properly. I said yes, holding a teriyaki burger. She said she was proud of me. I said thank you and didn't tell her I'd cried twice that week and couldn't really explain why. There are things that don't travel over WiFi even when the connection is good.",
    imageUrl:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=75",
    attribution: "Marta P., 18 months in Osaka",
    year: "2021",
    tags: ["calling home", "family", "loneliness", "namba", "wifi"],
  },
];

export const mapCenter: [number, number] = [36.5, 137.5];
export const mapDefaultZoom = 6;
