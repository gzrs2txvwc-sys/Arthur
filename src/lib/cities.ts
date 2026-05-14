import type { City, CitySlug } from "./types";

export const cities: Record<CitySlug, City> = {
  tokyo: {
    slug: "tokyo",
    name: "Tokyo",
    nameJa: "東京",
    tagline: "Electric and lonely.",
    taglineJa: "電気的で、孤独。",
    description:
      "Tokyo does not sleep. It hums — a low, constant frequency beneath forty million heartbeats. Here, loneliness is not an absence but a texture: the feel of 3am convenience store light on wet pavement, the weight of a crowd that moves around you like water. Electric, anonymous, and somehow more alive than anywhere else on earth.",
    descriptionJa:
      "東京は眠らない。四千万の心臓の鼓動の下に、低く絶え間ない周波数で鳴り続ける。ここでは、孤独は欠如ではなく質感だ：濡れた路面に映るコンビニの深夜の光、水のように周りを動く群衆の重さ。電気的で、匿名で、それでも地球上のどこよりも生きている。",
    palette: {
      from: "#1a1a2e",
      to: "#e94560",
      accent: "#e94560",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80",
    imageAlt: "Tokyo at night, neon reflections on wet streets",
    population: "13.96M",
    prefecture: "Tokyo Metropolis",
    feelings: [
      "Electric anonymity",
      "3am vending machines",
      "The loneliness of crowds",
      "Neon in the rain",
    ],
    feelingsJa: [
      "電気的な匿名性",
      "深夜の自動販売機",
      "群衆の中の孤独",
      "雨の中のネオン",
    ],
  },

  kyoto: {
    slug: "kyoto",
    name: "Kyoto",
    nameJa: "京都",
    tagline: "Quiet and nostalgic.",
    taglineJa: "静かで、懐かしい。",
    description:
      "Kyoto does not rush. It waits — in the moss between old stones, in the pause before a temple bell, in the way morning light crosses a paper screen. This is a city that remembers everything: the weight of silk, the smell of cedar and incense, the sound of wooden sandals on a cobbled lane at dusk. It makes you nostalgic for a life you have never lived.",
    descriptionJa:
      "京都は急がない。待つのだ — 古い石の間の苔の中に、寺の鐘が鳴る前の間に、朝の光が障子を横切る様に。この街はすべてを覚えている：絹の重さ、杉と線香の香り、黄昏時の石畳の路地に響く木の下駄の音。経験したことのない人生への郷愁を感じさせる。",
    palette: {
      from: "#1a2e1e",
      to: "#c9a96e",
      accent: "#c9a96e",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    imageAlt: "Kyoto temple path with bamboo and soft morning light",
    population: "1.46M",
    prefecture: "Kyoto Prefecture",
    feelings: [
      "Ancient silence",
      "Moss and cedar",
      "The weight of centuries",
      "Morning temple bells",
    ],
    feelingsJa: ["古代の沈黙", "苔と杉", "世紀の重さ", "朝の寺の鐘"],
  },

  osaka: {
    slug: "osaka",
    name: "Osaka",
    nameJa: "大阪",
    tagline: "Warm and energetic.",
    taglineJa: "温かく、エネルギッシュ。",
    description:
      "Osaka does not hold back. It feeds you, it teases you, it pulls you into a conversation you did not know you were having. This is Japan without the formality — where strangers share tables, where food is religion, where the city laughs at itself. Dotonbori at midnight is the most human place in the world: chaotic, warm, and completely honest about what it wants.",
    descriptionJa:
      "大阪は遠慮しない。食べさせ、からかい、知らないうちに会話に引き込む。これは格式のない日本だ — 見知らぬ人がテーブルを共有し、食が宗教であり、街が自分自身を笑う場所。深夜の道頓堀は世界で最も人間らしい場所だ：混沌として、温かく、自分が望むものについて完全に正直だ。",
    palette: {
      from: "#2a0e00",
      to: "#ff6b35",
      accent: "#ff6b35",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=1600&q=80",
    imageAlt: "Osaka Dotonbori district at night with glowing signs",
    population: "2.76M",
    prefecture: "Osaka Prefecture",
    feelings: [
      "Street food warmth",
      "Dotonbori midnight",
      "Laughter without reason",
      "The democracy of hunger",
    ],
    feelingsJa: [
      "屋台の温もり",
      "深夜の道頓堀",
      "理由のない笑い",
      "空腹の民主主義",
    ],
  },
};

export function getCity(slug: string): City | undefined {
  return cities[slug as CitySlug];
}

export function getAllCities(): City[] {
  return Object.values(cities);
}
