// Places layer — specific spots within neighborhoods.
// Not a directory. No addresses, no hours, no ratings.
// Each place is described by what kind of person ends up there.

export type PlaceCategory =
  | "cafe"
  | "bar"
  | "bookshop"
  | "record"
  | "kissaten"
  | "shop"
  | "gallery"
  | "izakaya"
  | "dining";

export interface TokyoPlace {
  id:             string;
  neighborhoodId: string;
  nameEn:         string;
  nameJa:         string;

  category: PlaceCategory;

  // One sentence — what it is
  shortEn: string;
  shortJa: string;
  shortZh: string;

  // Who it's for — the Arthur voice
  forWhomEn: string;
  forWhomJa: string;
  forWhomZh: string;

  // When it makes most sense to surface this
  bestPeriods?: string[];

  weight: number;
}

const ALL_PLACES: TokyoPlace[] = [

  // ── Nakameguro ────────────────────────────────────────────────────────────

  {
    id:             "nakameguro-canal-bar",
    neighborhoodId: "nakameguro",
    nameEn:         "The Canal Bar",
    nameJa:         "運河のバー",
    category:       "bar",
    shortEn:        "Below street level, between the canal and the apartment buildings behind it. You find it by accident the first time.",
    shortJa:        "路面より低いところ、運河とその後ろのアパートの間にある。最初は偶然見つける。",
    shortZh:        "在街道下方，運河和後面公寓之間。第一次是偶然找到的。",
    forWhomEn:      "For people who want a reason to stay out a little longer.",
    forWhomJa:      "もう少し外にいる理由が欲しい人のために。",
    forWhomZh:      "為那些想多在外面待一會兒的人。",
    bestPeriods:    ["evening", "night", "latenight"],
    weight:         1,
  },
  {
    id:             "nakameguro-canal-coffee",
    neighborhoodId: "nakameguro",
    nameEn:         "Canal Morning",
    nameJa:         "運河の朝",
    category:       "cafe",
    shortEn:        "Coffee on the canal side. The afternoon light comes in sideways. Small menu. They don't rush you.",
    shortJa:        "運河側でのコーヒー。午後の光が横から差し込む。小さいメニュー。急かされない。",
    shortZh:        "運河旁的咖啡。午後的光線從側面斜射進來。菜單很少。不催你走。",
    forWhomEn:      "For people who want to sit still for an hour without a reason.",
    forWhomJa:      "理由なく一時間じっとしていたい人のために。",
    forWhomZh:      "為那些想無緣無故靜坐一小時的人。",
    bestPeriods:    ["morning", "earlyMorning", "afternoon"],
    weight:         1,
  },

  // ── Daikanyama ────────────────────────────────────────────────────────────

  {
    id:             "daikanyama-bookshop",
    neighborhoodId: "daikanyama",
    nameEn:         "The Light Bookshop",
    nameJa:         "光の書店",
    category:       "bookshop",
    shortEn:        "English and Japanese titles shelved together without apology. The selection is someone's actual taste, not an algorithm.",
    shortJa:        "英語と日本語の本が、悪びれることなく並んでいる。誰かの本当の趣味であって、アルゴリズムじゃない。",
    shortZh:        "英文書和日文書毫不尷尬地並排在一起。這是某人真正的品味，不是演算法的結果。",
    forWhomEn:      "For people who like bookshops that have taken a position.",
    forWhomJa:      "立場を持った書店が好きな人のために。",
    forWhomZh:      "為那些喜歡有立場的書店的人。",
    bestPeriods:    ["morning", "afternoon", "evening"],
    weight:         1,
  },
  {
    id:             "daikanyama-terrace-cafe",
    neighborhoodId: "daikanyama",
    nameEn:         "Behind the Station",
    nameJa:         "駅の裏",
    category:       "cafe",
    shortEn:        "A café in a building that used to be something else. Old chairs. Good music. Nobody is going to rush you.",
    shortJa:        "元は別の何かだった建物のカフェ。古い椅子。いい音楽。急かされない。",
    shortZh:        "在一棟曾經是別的東西的建築裡的咖啡廳。舊椅子。好音樂。沒人催你走。",
    forWhomEn:      "For people who have found themselves in Daikanyama and need somewhere to stay.",
    forWhomJa:      "代官山に来てしまって、どこかにいたい人のために。",
    forWhomZh:      "為那些不小心到了代官山、需要一個待的地方的人。",
    bestPeriods:    ["afternoon", "evening"],
    weight:         1,
  },

  // ── Shimokitazawa ─────────────────────────────────────────────────────────

  {
    id:             "shimokitazawa-garden-cafe",
    neighborhoodId: "shimokitazawa",
    nameEn:         "The Garden House",
    nameJa:         "庭の家",
    category:       "cafe",
    shortEn:        "A café in a house with an overgrown garden. Small enough that everyone inside is eventually going to notice each other.",
    shortJa:        "草が茂った庭のある家のカフェ。中にいる人がいずれ互いに気づくほど小さい。",
    shortZh:        "一間有著雜草叢生庭院的屋子裡的咖啡廳。小到裡面的人最終都會注意到彼此。",
    forWhomEn:      "For people who want to feel like they belong somewhere before they officially do.",
    forWhomJa:      "正式にそうなる前に、どこかに属している気分になりたい人のために。",
    forWhomZh:      "為那些想在正式融入之前就感受到歸屬感的人。",
    bestPeriods:    ["morning", "earlyMorning", "afternoon"],
    weight:         1,
  },
  {
    id:             "shimokitazawa-record",
    neighborhoodId: "shimokitazawa",
    nameEn:         "The Record Room",
    nameJa:         "レコードの部屋",
    category:       "record",
    shortEn:        "A secondhand record shop run by someone with strong opinions and deep inventory. You will find something here.",
    shortJa:        "強いこだわりと深い在庫を持つ人が営む中古レコード屋。ここで何か見つかる。",
    shortZh:        "一家有著強烈個性和深厚庫存的二手唱片行。你在這裡一定能找到什麼。",
    forWhomEn:      "For people who can spend an hour in a record shop without buying anything and still feel it was worth it.",
    forWhomJa:      "何も買わなくてもレコード屋で1時間過ごして、それでも価値があったと感じられる人のために。",
    forWhomZh:      "為那些可以在唱片行待一個小時、什麼都不買，還是覺得值得的人。",
    bestPeriods:    ["afternoon", "evening"],
    weight:         1,
  },
  {
    id:             "shimokitazawa-small-bar",
    neighborhoodId: "shimokitazawa",
    nameEn:         "Eight Seats",
    nameJa:         "八席",
    category:       "bar",
    shortEn:        "Eight seats. Not much signage. Strangers end up talking — not on purpose, it just happens.",
    shortJa:        "八席。看板はほとんどない。見知らぬ人が話し始める——わざとじゃなく、そうなる。",
    shortZh:        "八個座位。沒什麼招牌。陌生人最終會開始說話——不是故意的，就是這樣發生了。",
    forWhomEn:      "For people who wouldn't mind if that happened.",
    forWhomJa:      "もしそうなっても、かまわない人のために。",
    forWhomZh:      "為那些不介意這樣發生的人。",
    bestPeriods:    ["evening", "night", "latenight"],
    weight:         1,
  },

  // ── Aoyama ────────────────────────────────────────────────────────────────

  {
    id:             "aoyama-design-books",
    neighborhoodId: "aoyama",
    nameEn:         "Architecture and Books",
    nameJa:         "建築と本",
    category:       "bookshop",
    shortEn:        "A design bookshop where the curation is serious. You can stand here for a while and nobody will think that's strange.",
    shortJa:        "キュレーションが真剣なデザイン書店。しばらく立っていても、誰もおかしいとは思わない。",
    shortZh:        "一家選書很嚴肅的設計書店。你可以在這裡站一陣子，沒有人會覺得奇怪。",
    forWhomEn:      "For people who like spaces that ask something of them.",
    forWhomJa:      "何かを求めてくる空間が好きな人のために。",
    forWhomZh:      "為那些喜歡對自己有所要求的空間的人。",
    bestPeriods:    ["afternoon", "evening"],
    weight:         1,
  },
  {
    id:             "aoyama-quiet-cafe",
    neighborhoodId: "aoyama",
    nameEn:         "Below Street Level",
    nameJa:         "路面の下",
    category:       "cafe",
    shortEn:        "A basement café that gets quieter as the day goes on. For being in Aoyama without performing it.",
    shortJa:        "昼が進むほど静かになる地下のカフェ。青山にいながら、青山を演じなくていい。",
    shortZh:        "一家隨著白天進行越來越安靜的地下咖啡廳。在青山，卻不用表演青山。",
    forWhomEn:      "For people who have been walking too long and need to stop.",
    forWhomJa:      "歩きすぎて、少し止まりたい人のために。",
    forWhomZh:      "為那些走太久、需要停下來的人。",
    bestPeriods:    ["afternoon", "evening", "night"],
    weight:         1,
  },

  // ── Nishi-Ogikubo ─────────────────────────────────────────────────────────

  {
    id:             "nishi-ogi-kissaten",
    neighborhoodId: "nishi-ogikubo",
    nameEn:         "The Old Coffee Shop",
    nameJa:         "昔の喫茶店",
    category:       "kissaten",
    shortEn:        "A kissaten that has been here since before the area was interesting. Strong coffee, old music. No one will ask you to move.",
    shortJa:        "この街がおもしろくなる前からある喫茶店。強いコーヒー、古い音楽。席を立つよう言われない。",
    shortZh:        "在這個地區變得有趣之前就存在的純喫茶。濃咖啡、老音樂。沒人會叫你離開。",
    forWhomEn:      "For people who want to be left alone in a comfortable way.",
    forWhomJa:      "気持ちよく放っておかれたい人のために。",
    forWhomZh:      "為那些想以舒適的方式被人忽略的人。",
    bestPeriods:    ["morning", "earlyMorning", "afternoon"],
    weight:         1,
  },
  {
    id:             "nishi-ogi-antique",
    neighborhoodId: "nishi-ogikubo",
    nameEn:         "Two Floors of Objects",
    nameJa:         "2階の物たち",
    category:       "shop",
    shortEn:        "Showa-era furniture and objects of uncertain purpose spread across two floors. You don't have to buy anything.",
    shortJa:        "昭和時代の家具と、用途がよくわからないものが2階に広がっている。何も買わなくていい。",
    shortZh:        "昭和時代的家具和用途不明的物品散落在兩層樓上。你不必買任何東西。",
    forWhomEn:      "For people who like things that have been somewhere.",
    forWhomJa:      "どこかにいたことのあるものが好きな人のために。",
    forWhomZh:      "為那些喜歡有過去的東西的人。",
    bestPeriods:    ["afternoon"],
    weight:         1,
  },

  // ── Kagurazaka ────────────────────────────────────────────────────────────

  {
    id:             "kagurazaka-alley-wine",
    neighborhoodId: "kagurazaka",
    nameEn:         "The Alley Bar",
    nameJa:         "路地のバー",
    category:       "bar",
    shortEn:        "Up a narrow staircase in one of the alleys off the main street. Eight seats. The wine list is short and right.",
    shortJa:        "メイン通りから外れた路地の、細い階段を上ったところ。八席。ワインリストは短くて正しい。",
    shortZh:        "在主街旁邊小巷子裡一段窄樓梯上面。八個座位。葡萄酒單短而對。",
    forWhomEn:      "For people who enjoy the part where you find the place.",
    forWhomJa:      "場所を見つけるその過程が好きな人のために。",
    forWhomZh:      "為那些享受找到地方那個過程的人。",
    bestPeriods:    ["evening", "night"],
    weight:         1,
  },
  {
    id:             "kagurazaka-twenty-years",
    neighborhoodId: "kagurazaka",
    nameEn:         "Twenty Years Here",
    nameJa:         "ここに二十年",
    category:       "dining",
    shortEn:        "A French restaurant that has been in this alley for twenty years and does not explain itself. The owner will remember what you ordered after two visits.",
    shortJa:        "この路地に二十年いるフランス料理の店で、説明しない。二回来れば何を注文したか覚えてくれる。",
    shortZh:        "一家在這條小巷二十年的法式餐廳，從不解釋自己。來兩次後，老闆會記得你點了什麼。",
    forWhomEn:      "For people who want to become a regular somewhere.",
    forWhomJa:      "どこかの常連になりたい人のために。",
    forWhomZh:      "為那些想在某個地方成為常客的人。",
    bestPeriods:    ["evening", "night"],
    weight:         1,
  },

  // ── Koenji ────────────────────────────────────────────────────────────────

  {
    id:             "koenji-record",
    neighborhoodId: "koenji",
    nameEn:         "The Deep Record Shop",
    nameJa:         "深いレコード屋",
    category:       "record",
    shortEn:        "A secondhand shop with an owner who cares too much. The stock is deep. You need to know what you're looking for, or be willing to find out.",
    shortJa:        "こだわりすぎなオーナーがいる中古店。在庫は深い。何を探しているか知っているか、それを発見する覚悟が必要だ。",
    shortZh:        "一家老闆太投入的二手唱片行。庫存深厚。你需要知道自己在找什麼，或者準備好去發現。",
    forWhomEn:      "For people who like shops that have a point of view.",
    forWhomJa:      "視点を持つ店が好きな人のために。",
    forWhomZh:      "為那些喜歡有立場的店的人。",
    bestPeriods:    ["afternoon", "evening"],
    weight:         1,
  },
  {
    id:             "koenji-dive-bar",
    neighborhoodId: "koenji",
    nameEn:         "The Dive",
    nameJa:         "ダイブ",
    category:       "bar",
    shortEn:        "Looks like a storage unit from the outside. Inside it's full, the music is loud, and everyone seems to know each other.",
    shortJa:        "外から見ると倉庫のようだ。中は満員で、音楽は大きく、みんな知り合いのようだ。",
    shortZh:        "從外面看像個倉庫。裡面很滿，音樂很響，大家好像都認識彼此。",
    forWhomEn:      "For people who like it when Tokyo hides something good.",
    forWhomJa:      "東京がいいものを隠しているとき、それが好きな人のために。",
    forWhomZh:      "為那些喜歡東京藏著好東西的人。",
    bestPeriods:    ["night", "latenight"],
    weight:         1,
  },

  // ── Kiyosumi-Shirakawa ───────────────────────────────────────────────────

  {
    id:             "kiyosumi-river-roaster",
    neighborhoodId: "kiyosumi-shirakawa",
    nameEn:         "The River Roaster",
    nameJa:         "川沿いの焙煎所",
    category:       "cafe",
    shortEn:        "A coffee roaster by the river. Serious about what it does, quiet enough to think in.",
    shortJa:        "川のそばのコーヒー焙煎所。仕事に真剣で、考えるには十分に静かだ。",
    shortZh:        "河邊的咖啡烘焙所。對自己的工作認真，安靜得足以讓人思考。",
    forWhomEn:      "For people who want a café that doesn't need to justify itself.",
    forWhomJa:      "自己を正当化する必要のないカフェが欲しい人のために。",
    forWhomZh:      "為那些想要一家不需要為自己辯護的咖啡廳的人。",
    bestPeriods:    ["morning", "earlyMorning", "afternoon"],
    weight:         1,
  },
  {
    id:             "kiyosumi-warehouse-gallery",
    neighborhoodId: "kiyosumi-shirakawa",
    nameEn:         "The Warehouse",
    nameJa:         "倉庫",
    category:       "gallery",
    shortEn:        "A contemporary art space in a converted warehouse. The shows change every few weeks. Sometimes you won't understand it. That's fine.",
    shortJa:        "改装された倉庫のコンテンポラリーアートスペース。展示は数週間ごとに変わる。ときにわからないこともある。それでいい。",
    shortZh:        "一個改建倉庫裡的當代藝術空間。展覽每幾週更換一次。有時你看不懂。沒關係。",
    forWhomEn:      "For people who like being around things that are trying something.",
    forWhomJa:      "何かを試みているものの近くにいるのが好きな人のために。",
    forWhomZh:      "為那些喜歡待在正在嘗試什麼的東西旁邊的人。",
    bestPeriods:    ["afternoon"],
    weight:         1,
  },

  // ── Yanaka ────────────────────────────────────────────────────────────────

  {
    id:             "yanaka-bathhouse-gallery",
    neighborhoodId: "yanaka",
    nameEn:         "The Bathhouse Gallery",
    nameJa:         "銭湯ギャラリー",
    category:       "gallery",
    shortEn:        "A contemporary gallery inside a hundred-year-old bathhouse. The building is part of the art.",
    shortJa:        "百年の銭湯の中にあるコンテンポラリーギャラリー。建物自体がアートの一部だ。",
    shortZh:        "在一座百年澡堂裡的當代藝廊。建築本身也是藝術的一部分。",
    forWhomEn:      "For people who like things that are two things at once.",
    forWhomJa:      "一度に二つのものであるものが好きな人のために。",
    forWhomZh:      "為那些喜歡同時是兩件事的東西的人。",
    bestPeriods:    ["afternoon", "evening"],
    weight:         1,
  },
  {
    id:             "yanaka-specific-shop",
    neighborhoodId: "yanaka",
    nameEn:         "The One Thing Shop",
    nameJa:         "一つのもの",
    category:       "shop",
    shortEn:        "A small shop that does one thing and takes it seriously. The kind you understand immediately why people come back.",
    shortJa:        "一つのことを真剣にやる小さい店。なぜ人が戻ってくるか、すぐにわかる種類の店だ。",
    shortZh:        "一家只做一件事、並且認真對待的小店。你會立刻明白為什麼人們會一再回來。",
    forWhomEn:      "For people who respond to specificity.",
    forWhomJa:      "明確さに反応する人のために。",
    forWhomZh:      "為那些對專注感到共鳴的人。",
    bestPeriods:    ["morning", "afternoon"],
    weight:         1,
  },

  // ── Sangenjaya ────────────────────────────────────────────────────────────

  {
    id:             "sangenjaya-neighborhood-cafe",
    neighborhoodId: "sangenjaya",
    nameEn:         "The Neighborhood Café",
    nameJa:         "街のカフェ",
    category:       "cafe",
    shortEn:        "The regulars are there most mornings. The owner knows what they want. You can start becoming one of them.",
    shortJa:        "常連は毎朝いる。オーナーは彼らの好みを知っている。あなたもその一人になれる。",
    shortZh:        "常客大多數早晨都在。老闆知道他們要什麼。你可以開始成為其中一員。",
    forWhomEn:      "For people who want to start a routine somewhere.",
    forWhomJa:      "どこかでルーティンを始めたい人のために。",
    forWhomZh:      "為那些想在某個地方開始建立習慣的人。",
    bestPeriods:    ["morning", "earlyMorning", "afternoon"],
    weight:         1,
  },
  {
    id:             "sangenjaya-family-izakaya",
    neighborhoodId: "sangenjaya",
    nameEn:         "The Family Izakaya",
    nameJa:         "家族の居酒屋",
    category:       "izakaya",
    shortEn:        "In the same family for a long time. The menu is handwritten and changes. You eat like you live here.",
    shortJa:        "長い間、同じ家族が続けている。メニューは手書きで変わる。ここに住んでいるように食べる。",
    shortZh:        "同一個家族經營了很長時間。菜單是手寫的，會變。你像住在這裡一樣吃飯。",
    forWhomEn:      "For people tired of restaurants that feel like restaurants.",
    forWhomJa:      "レストランみたいな感じのレストランに疲れた人のために。",
    forWhomZh:      "為那些厭倦了感覺像餐廳的餐廳的人。",
    bestPeriods:    ["evening", "night"],
    weight:         1,
  },

  // ── Gakugeidaigaku ────────────────────────────────────────────────────────

  {
    id:             "gaku-counter-bar",
    neighborhoodId: "gakugeidaigaku",
    nameEn:         "The Counter",
    nameJa:         "カウンター",
    category:       "bar",
    shortEn:        "Three stools at a counter, two bottles on a shelf, one person running it. A conversation starts by accident.",
    shortJa:        "カウンターに三つのスツール、棚に二本のボトル、一人が切り盛りしている。会話は偶然始まる。",
    shortZh:        "吧台前三個凳子，架子上兩瓶酒，一個人在掌管。對話偶然開始。",
    forWhomEn:      "For people who want the option of not being alone.",
    forWhomJa:      "一人じゃなくてもいいという選択肢がほしい人のために。",
    forWhomZh:      "為那些想要不必獨處這個選項的人。",
    bestPeriods:    ["evening", "night"],
    weight:         1,
  },
];

// ── Scoring + selection ────────────────────────────────────────────────────

function scorePlaceForPeriod(place: TokyoPlace, period: string): number {
  if (!place.bestPeriods || place.bestPeriods.length === 0) return place.weight;
  return place.bestPeriods.includes(period) ? place.weight + 1 : place.weight - 0.2;
}

export function getPlacesByNeighborhood(
  neighborhoodId: string,
  period?: string,
): TokyoPlace[] {
  const places = ALL_PLACES.filter((p) => p.neighborhoodId === neighborhoodId);
  if (period) {
    places.sort((a, b) => scorePlaceForPeriod(b, period) - scorePlaceForPeriod(a, period));
  }
  return places.slice(0, 3);
}

// For a future homepage "tonight's place" — one place globally
export function getTonightsPlace(period: string): TokyoPlace | null {
  const scored = ALL_PLACES.map((p) => ({ p, score: scorePlaceForPeriod(p, period) }));
  scored.sort((a, b) => b.score - a.score);
  // Daily seed so it doesn't change every render
  const seed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const pool = scored.slice(0, 8);
  return pool[seed % pool.length]?.p ?? null;
}

// ── Locale helpers ─────────────────────────────────────────────────────────

export function getPlaceShort(p: TokyoPlace, g: string): string {
  if (g === "ja") return p.shortJa;
  if (g === "zh") return p.shortZh;
  return p.shortEn;
}

export function getPlaceForWhom(p: TokyoPlace, g: string): string {
  if (g === "ja") return p.forWhomJa;
  if (g === "zh") return p.forWhomZh;
  return p.forWhomEn;
}

export function getPlaceName(p: TokyoPlace, g: string): string {
  if (g === "ja") return p.nameJa;
  return p.nameEn;
}

const CATEGORY_LABELS: Record<PlaceCategory, { en: string; ja: string; zh: string }> = {
  cafe:     { en: "CAFÉ",      ja: "カフェ",      zh: "咖啡廳" },
  bar:      { en: "BAR",       ja: "バー",        zh: "酒吧" },
  bookshop: { en: "BOOKS",     ja: "本屋",        zh: "書店" },
  record:   { en: "RECORDS",   ja: "レコード",    zh: "唱片行" },
  kissaten: { en: "喫茶店",    ja: "喫茶店",      zh: "喫茶店" },
  shop:     { en: "SHOP",      ja: "ショップ",    zh: "小店" },
  gallery:  { en: "GALLERY",   ja: "ギャラリー",  zh: "藝廊" },
  izakaya:  { en: "IZAKAYA",   ja: "居酒屋",      zh: "居酒屋" },
  dining:   { en: "DINING",    ja: "食事",        zh: "餐廳" },
};

export function getCategoryLabel(category: PlaceCategory, g: string): string {
  const label = CATEGORY_LABELS[category];
  if (g === "ja") return label.ja;
  if (g === "zh") return label.zh;
  return label.en;
}
