export interface TonightSignal {
  id: string;
  neighborhood: string;       // Japanese: 下北沢
  neighborhoodEn: string;     // English: Shimokitazawa
  station: string;            // Japanese: 下北沢
  stationEn: string;          // English: Shimokitazawa
  walkMinutes: number;
  coords: [number, number];   // [lat, lng]
  type: "jazz" | "market" | "food" | "art" | "bar" | "popup" | "film" | "book";
  observation: string;        // Japanese atmospheric one-liner
  observationEn: string;      // English equivalent (NOT a translation, a rewrite)
  timeOpen: number;           // 0-23 Tokyo hour
  timeClose: number;          // can be < timeOpen for overnight
  weatherBoost?: Array<"clear" | "sunny" | "cloudy" | "overcast" | "rainy" | "foggy" | "snowy" | "cold" | "humid">;
  periodBoost?: Array<"dawn" | "morning" | "daytime" | "sunset" | "evening" | "night" | "latenight">;
  dayBoost?: Array<"weekday" | "friday" | "saturday" | "sunday">;
}

export const ALL_SIGNALS: TonightSignal[] = [
  // ── 下北沢 Shimokitazawa ─────────────────────────────────────────────────
  {
    id: "shimokita-livehouse-01",
    neighborhood: "下北沢",
    neighborhoodEn: "Shimokitazawa",
    station: "下北沢",
    stationEn: "Shimokitazawa",
    walkMinutes: 4,
    coords: [35.6614, 139.6671],
    type: "jazz",
    observation: "扉の隙間から音が漏れている。",
    observationEn: "Sound bleeds through the gap in the door.",
    timeOpen: 20,
    timeClose: 1,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },
  {
    id: "shimokita-vinyl-01",
    neighborhood: "下北沢",
    neighborhoodEn: "Shimokitazawa",
    station: "下北沢",
    stationEn: "Shimokitazawa",
    walkMinutes: 3,
    coords: [35.6609, 139.6685],
    type: "book",
    observation: "古いレコードを手に取る人の指が、静かに迷っている。",
    observationEn: "Someone's fingers move slowly across the record spines, unhurried.",
    timeOpen: 13,
    timeClose: 22,
    periodBoost: ["evening", "sunset"],
  },
  {
    id: "shimokita-bar-02",
    neighborhood: "下北沢",
    neighborhoodEn: "Shimokitazawa",
    station: "下北沢",
    stationEn: "Shimokitazawa",
    walkMinutes: 6,
    coords: [35.6621, 139.6677],
    type: "bar",
    observation: "カウンターに二人、何も話さずにグラスを傾けている。",
    observationEn: "Two people at the bar, not talking, tilting their glasses.",
    timeOpen: 19,
    timeClose: 3,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday", "sunday"],
  },

  // ── 中目黒 Nakameguro ──────────────────────────────────────────────────
  {
    id: "nakameguro-yatai-01",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 2,
    coords: [35.6442, 139.6993],
    type: "food",
    observation: "熱燗を買った人が橋の欄干にもたれている。",
    observationEn: "Someone who bought hot sake leans against the bridge railing, watching the water.",
    timeOpen: 17,
    timeClose: 22,
    periodBoost: ["evening", "sunset"],
    weatherBoost: ["clear", "cloudy", "cold"],
    dayBoost: ["friday", "saturday", "sunday"],
  },
  {
    id: "nakameguro-gallery-01",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 5,
    coords: [35.6438, 139.7001],
    type: "art",
    observation: "白い壁の前に、一人立ったまま動かない。",
    observationEn: "One person standing motionless in front of a white wall.",
    timeOpen: 11,
    timeClose: 20,
    periodBoost: ["daytime", "sunset", "evening"],
  },
  {
    id: "nakameguro-coffee-01",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 3,
    coords: [35.6445, 139.7008],
    type: "bar",
    observation: "川沿いのカフェで、誰かがノートを開いたまま窓を見ている。",
    observationEn: "By the canal, someone has a notebook open but stares at the water.",
    timeOpen: 8,
    timeClose: 23,
    periodBoost: ["morning", "daytime", "evening", "night"],
    weatherBoost: ["rainy", "cloudy", "foggy"],
  },

  // ── 高円寺 Koenji ──────────────────────────────────────────────────────
  {
    id: "koenji-jazz-01",
    neighborhood: "高円寺",
    neighborhoodEn: "Koenji",
    station: "高円寺",
    stationEn: "Koenji",
    walkMinutes: 5,
    coords: [35.7055, 139.6494],
    type: "jazz",
    observation: "煙草の煙とトランペットの音が同じ速さで漂っている。",
    observationEn: "Cigarette smoke and trumpet notes drift at the same unhurried speed.",
    timeOpen: 20,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },
  {
    id: "koenji-vintage-01",
    neighborhood: "高円寺",
    neighborhoodEn: "Koenji",
    station: "高円寺",
    stationEn: "Koenji",
    walkMinutes: 4,
    coords: [35.7047, 139.6502],
    type: "popup",
    observation: "古着の山の中から、誰かが袖を引き出している。",
    observationEn: "Someone pulling a sleeve out from a pile of vintage coats.",
    timeOpen: 12,
    timeClose: 21,
    periodBoost: ["daytime", "sunset", "evening"],
    dayBoost: ["saturday", "sunday"],
  },

  // ── 谷中 Yanaka ───────────────────────────────────────────────────────
  {
    id: "yanaka-ginza-01",
    neighborhood: "谷中",
    neighborhoodEn: "Yanaka",
    station: "日暮里",
    stationEn: "Nippori",
    walkMinutes: 8,
    coords: [35.7286, 139.7693],
    type: "food",
    observation: "商店街の端で、猫が魚屋の前に座って動かない。",
    observationEn: "At the end of the shopping lane, a cat sits unmoved outside the fishmonger.",
    timeOpen: 10,
    timeClose: 19,
    periodBoost: ["daytime", "sunset"],
    dayBoost: ["saturday", "sunday"],
  },
  {
    id: "yanaka-gallery-01",
    neighborhood: "谷中",
    neighborhoodEn: "Yanaka",
    station: "千駄木",
    stationEn: "Sendagi",
    walkMinutes: 6,
    coords: [35.7265, 139.7659],
    type: "art",
    observation: "細い路地の奥に、灯りがひとつついている。",
    observationEn: "One light on, deep inside the narrow alley.",
    timeOpen: 12,
    timeClose: 19,
    periodBoost: ["daytime", "sunset"],
  },

  // ── 神楽坂 Kagurazaka ─────────────────────────────────────────────────
  {
    id: "kagurazaka-bistro-01",
    neighborhood: "神楽坂",
    neighborhoodEn: "Kagurazaka",
    station: "神楽坂",
    stationEn: "Kagurazaka",
    walkMinutes: 3,
    coords: [35.7015, 139.7411],
    type: "food",
    observation: "石畳に雨が降りはじめると、傘が次々と開いていく。",
    observationEn: "As rain starts on the cobblestones, umbrellas open one after another.",
    timeOpen: 18,
    timeClose: 23,
    periodBoost: ["evening", "night"],
    weatherBoost: ["rainy", "cloudy"],
  },
  {
    id: "kagurazaka-jazz-01",
    neighborhood: "神楽坂",
    neighborhoodEn: "Kagurazaka",
    station: "神楽坂",
    stationEn: "Kagurazaka",
    walkMinutes: 5,
    coords: [35.7022, 139.7405],
    type: "jazz",
    observation: "路地の奥から、ピアノが一音だけ聞こえた。",
    observationEn: "A single piano note floats out from somewhere deep in the alley.",
    timeOpen: 19,
    timeClose: 1,
    periodBoost: ["evening", "night"],
    weatherBoost: ["rainy", "foggy"],
  },

  // ── 三軒茶屋 Sangenjaya ────────────────────────────────────────────────
  {
    id: "sangenjaya-bar-01",
    neighborhood: "三軒茶屋",
    neighborhoodEn: "Sangenjaya",
    station: "三軒茶屋",
    stationEn: "Sangenjaya",
    walkMinutes: 4,
    coords: [35.6438, 139.6695],
    type: "bar",
    observation: "立ち飲み屋の前に、仕事帰りの人が五人並んでいる。",
    observationEn: "Five people in work clothes line up outside the standing bar.",
    timeOpen: 17,
    timeClose: 23,
    periodBoost: ["sunset", "evening"],
    dayBoost: ["weekday", "friday"],
  },
  {
    id: "sangenjaya-live-01",
    neighborhood: "三軒茶屋",
    neighborhoodEn: "Sangenjaya",
    station: "三軒茶屋",
    stationEn: "Sangenjaya",
    walkMinutes: 6,
    coords: [35.6432, 139.6703],
    type: "jazz",
    observation: "ドラムのリズムが地下から伝わってくる。",
    observationEn: "Drum rhythms pulse up through the pavement from somewhere underground.",
    timeOpen: 21,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 代官山 Daikanyama ─────────────────────────────────────────────────
  {
    id: "daikanyama-bookstore-01",
    neighborhood: "代官山",
    neighborhoodEn: "Daikanyama",
    station: "代官山",
    stationEn: "Daikanyama",
    walkMinutes: 7,
    coords: [35.6485, 139.7026],
    type: "book",
    observation: "深夜の本屋で、誰かが詩集を床に座って読んでいる。",
    observationEn: "Late-night bookshop — someone sitting on the floor, reading poetry.",
    timeOpen: 11,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
    weatherBoost: ["rainy", "cloudy"],
  },
  {
    id: "daikanyama-popup-01",
    neighborhood: "代官山",
    neighborhoodEn: "Daikanyama",
    station: "代官山",
    stationEn: "Daikanyama",
    walkMinutes: 5,
    coords: [35.6491, 139.7035],
    type: "popup",
    observation: "週末限定の店に、開店前から三人が並んでいる。",
    observationEn: "Three people queuing before a weekend-only shop has even opened.",
    timeOpen: 11,
    timeClose: 19,
    dayBoost: ["saturday", "sunday"],
  },

  // ── 西荻窪 Nishi-Ogikubo ─────────────────────────────────────────────
  {
    id: "nishi-ogi-antique-01",
    neighborhood: "西荻窪",
    neighborhoodEn: "Nishi-Ogikubo",
    station: "西荻窪",
    stationEn: "Nishi-Ogikubo",
    walkMinutes: 3,
    coords: [35.7057, 139.5989],
    type: "popup",
    observation: "骨董屋の窓に、ランプの光が映りこんでいる。",
    observationEn: "A lamp glows inside the antique shop window, warm against the dark street.",
    timeOpen: 13,
    timeClose: 20,
    periodBoost: ["daytime", "sunset", "evening"],
    dayBoost: ["saturday", "sunday"],
  },
  {
    id: "nishi-ogi-jazz-01",
    neighborhood: "西荻窪",
    neighborhoodEn: "Nishi-Ogikubo",
    station: "西荻窪",
    stationEn: "Nishi-Ogikubo",
    walkMinutes: 5,
    coords: [35.7049, 139.5975],
    type: "jazz",
    observation: "客が二人だけの夜も、演奏は変わらない。",
    observationEn: "Only two people in the audience, but the set doesn't change.",
    timeOpen: 20,
    timeClose: 1,
    periodBoost: ["night"],
    dayBoost: ["weekday"],
  },

  // ── 阿佐ヶ谷 Asagaya ──────────────────────────────────────────────────
  {
    id: "asagaya-market-01",
    neighborhood: "阿佐ヶ谷",
    neighborhoodEn: "Asagaya",
    station: "阿佐ケ谷",
    stationEn: "Asagaya",
    walkMinutes: 3,
    coords: [35.7056, 139.6367],
    type: "market",
    observation: "夜の商店街に、まだ灯りの消えていない店が三軒ある。",
    observationEn: "Three shops on the evening arcade still haven't turned off their lights.",
    timeOpen: 18,
    timeClose: 22,
    periodBoost: ["evening", "night"],
  },

  // ── 清澄白河 Kiyosumi-Shirakawa ───────────────────────────────────────
  {
    id: "kiyosumi-coffee-01",
    neighborhood: "清澄白河",
    neighborhoodEn: "Kiyosumi-Shirakawa",
    station: "清澄白河",
    stationEn: "Kiyosumi-Shirakawa",
    walkMinutes: 4,
    coords: [35.6784, 139.7965],
    type: "bar",
    observation: "ロースターの前で、豆の香りが通りまで届いている。",
    observationEn: "The smell of roasting coffee drifts out of the roastery and into the street.",
    timeOpen: 9,
    timeClose: 19,
    periodBoost: ["morning", "daytime", "sunset"],
  },
  {
    id: "kiyosumi-art-01",
    neighborhood: "清澄白河",
    neighborhoodEn: "Kiyosumi-Shirakawa",
    station: "清澄白河",
    stationEn: "Kiyosumi-Shirakawa",
    walkMinutes: 6,
    coords: [35.6791, 139.7951],
    type: "art",
    observation: "倉庫を改装したギャラリーで、閉館間際に一人が残っている。",
    observationEn: "The converted warehouse gallery is closing — one person still hasn't left.",
    timeOpen: 11,
    timeClose: 19,
    periodBoost: ["sunset"],
  },

  // ── 門前仲町 Monzen-Nakacho ───────────────────────────────────────────
  {
    id: "monnakacho-izakaya-01",
    neighborhood: "門前仲町",
    neighborhoodEn: "Monzen-Nakacho",
    station: "門前仲町",
    stationEn: "Monzen-Nakacho",
    walkMinutes: 3,
    coords: [35.6722, 139.7954],
    type: "bar",
    observation: "焼き鳥の煙が路地に漂い、奥から笑い声が聞こえる。",
    observationEn: "Smoke from yakitori drifts down the alley; laughter follows it out.",
    timeOpen: 17,
    timeClose: 23,
    periodBoost: ["evening", "night"],
    dayBoost: ["weekday", "friday"],
  },
  {
    id: "monnakacho-ramen-01",
    neighborhood: "門前仲町",
    neighborhoodEn: "Monzen-Nakacho",
    station: "門前仲町",
    stationEn: "Monzen-Nakacho",
    walkMinutes: 5,
    coords: [35.6716, 139.7942],
    type: "food",
    observation: "深夜のラーメン屋、カウンターに一人、スープをゆっくり飲んでいる。",
    observationEn: "Late-night ramen counter — one person, taking their time with every spoonful.",
    timeOpen: 21,
    timeClose: 3,
    periodBoost: ["night", "latenight"],
    weatherBoost: ["cold", "rainy"],
  },

  // ── 新宿ゴールデン街 Shinjuku Golden Gai ─────────────────────────────
  {
    id: "golden-gai-bar-01",
    neighborhood: "新宿ゴールデン街",
    neighborhoodEn: "Golden Gai",
    station: "新宿",
    stationEn: "Shinjuku",
    walkMinutes: 9,
    coords: [35.6943, 139.7050],
    type: "bar",
    observation: "六席しかない店に、今夜も満員の札がかかっている。",
    observationEn: "Six-seat bar, and the full sign has been up since nine.",
    timeOpen: 19,
    timeClose: 4,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },
  {
    id: "golden-gai-jazz-01",
    neighborhood: "新宿ゴールデン街",
    neighborhoodEn: "Golden Gai",
    station: "新宿",
    stationEn: "Shinjuku",
    walkMinutes: 10,
    coords: [35.6938, 139.7044],
    type: "jazz",
    observation: "階段を上ると、古いレコードの音が壁に染みている。",
    observationEn: "Climb the narrow stairs and the walls are soaked in old records.",
    timeOpen: 20,
    timeClose: 5,
    periodBoost: ["night", "latenight"],
    weatherBoost: ["rainy", "cold"],
  },

  // ── 上野 Ueno ─────────────────────────────────────────────────────────
  {
    id: "ueno-ameyoko-01",
    neighborhood: "上野",
    neighborhoodEn: "Ueno",
    station: "上野",
    stationEn: "Ueno",
    walkMinutes: 2,
    coords: [35.7105, 139.7745],
    type: "market",
    observation: "閉店前の市場で、値下げの声が飛び交っている。",
    observationEn: "The market is nearly closing; discount calls echo down the arcade.",
    timeOpen: 16,
    timeClose: 20,
    periodBoost: ["sunset", "evening"],
    dayBoost: ["saturday", "sunday"],
  },
  {
    id: "ueno-jazz-01",
    neighborhood: "上野",
    neighborhoodEn: "Ueno",
    station: "上野",
    stationEn: "Ueno",
    walkMinutes: 7,
    coords: [35.7119, 139.7755],
    type: "jazz",
    observation: "公園のベンチで、ギターを膝に置いたまま眠っている人がいる。",
    observationEn: "Someone asleep on a park bench, guitar still in their lap.",
    timeOpen: 18,
    timeClose: 22,
    periodBoost: ["evening"],
    weatherBoost: ["clear"],
  },

  // ── 浅草 Asakusa ──────────────────────────────────────────────────────
  {
    id: "asakusa-yakitori-01",
    neighborhood: "浅草",
    neighborhoodEn: "Asakusa",
    station: "浅草",
    stationEn: "Asakusa",
    walkMinutes: 5,
    coords: [35.7148, 139.7973],
    type: "food",
    observation: "提灯の光が夜風に揺れて、通りが橙色に染まっている。",
    observationEn: "Paper lanterns sway in the night breeze, dyeing the whole street amber.",
    timeOpen: 17,
    timeClose: 23,
    periodBoost: ["evening", "night"],
    weatherBoost: ["clear", "cloudy"],
  },
  {
    id: "asakusa-bar-01",
    neighborhood: "浅草",
    neighborhoodEn: "Asakusa",
    station: "浅草",
    stationEn: "Asakusa",
    walkMinutes: 4,
    coords: [35.7155, 139.7962],
    type: "bar",
    observation: "老舗のバーで、マスターが何も言わずにグラスを磨いている。",
    observationEn: "The owner of the old bar polishes glasses in silence.",
    timeOpen: 18,
    timeClose: 0,
    periodBoost: ["evening", "night"],
  },

  // ── 目黒 Meguro ───────────────────────────────────────────────────────
  {
    id: "meguro-gallery-01",
    neighborhood: "目黒",
    neighborhoodEn: "Meguro",
    station: "目黒",
    stationEn: "Meguro",
    walkMinutes: 6,
    coords: [35.6334, 139.7157],
    type: "art",
    observation: "夜のギャラリー、最後の客が出るのを待っているスタッフ。",
    observationEn: "Gallery closing time — staff waiting quietly for the last visitor to leave.",
    timeOpen: 11,
    timeClose: 20,
    periodBoost: ["sunset"],
  },

  // ── 池袋 Ikebukuro ────────────────────────────────────────────────────
  {
    id: "ikebukuro-jazz-01",
    neighborhood: "池袋",
    neighborhoodEn: "Ikebukuro",
    station: "池袋",
    stationEn: "Ikebukuro",
    walkMinutes: 6,
    coords: [35.7298, 139.7115],
    type: "jazz",
    observation: "地下のジャズバーで、演奏が始まった瞬間に静かになる。",
    observationEn: "In the basement jazz bar, silence falls the instant the music starts.",
    timeOpen: 19,
    timeClose: 2,
    periodBoost: ["night"],
    dayBoost: ["friday", "saturday"],
  },
  {
    id: "ikebukuro-book-01",
    neighborhood: "池袋",
    neighborhoodEn: "Ikebukuro",
    station: "池袋",
    stationEn: "Ikebukuro",
    walkMinutes: 3,
    coords: [35.7308, 139.7105],
    type: "book",
    observation: "深夜の書店で、文庫本を何冊も抱えている学生がいる。",
    observationEn: "A student at the late-night bookshop, arms full of paperbacks.",
    timeOpen: 10,
    timeClose: 23,
    periodBoost: ["night"],
    dayBoost: ["weekday"],
  },

  // ── 戸越銀座 Togoshi Ginza ────────────────────────────────────────────
  {
    id: "togoshi-market-01",
    neighborhood: "戸越銀座",
    neighborhoodEn: "Togoshi Ginza",
    station: "戸越銀座",
    stationEn: "Togoshi Ginza",
    walkMinutes: 2,
    coords: [35.6125, 139.7154],
    type: "market",
    observation: "日本一長い商店街に、夕方の光が斜めに入っている。",
    observationEn: "Late afternoon light cuts sideways through Japan's longest shopping street.",
    timeOpen: 16,
    timeClose: 21,
    periodBoost: ["sunset", "evening"],
    dayBoost: ["saturday", "sunday"],
  },
  {
    id: "togoshi-food-01",
    neighborhood: "戸越銀座",
    neighborhoodEn: "Togoshi Ginza",
    station: "戸越銀座",
    stationEn: "Togoshi Ginza",
    walkMinutes: 3,
    coords: [35.6118, 139.7148],
    type: "food",
    observation: "コロッケ屋の前に、子どもを連れた親が三組並んでいる。",
    observationEn: "Three families queuing outside the croquette shop, kids in tow.",
    timeOpen: 11,
    timeClose: 20,
    periodBoost: ["daytime", "sunset"],
    dayBoost: ["saturday", "sunday"],
  },

  // ── 自由が丘 Jiyugaoka ────────────────────────────────────────────────
  {
    id: "jiyugaoka-patisserie-01",
    neighborhood: "自由が丘",
    neighborhoodEn: "Jiyugaoka",
    station: "自由が丘",
    stationEn: "Jiyugaoka",
    walkMinutes: 4,
    coords: [35.6073, 139.6682],
    type: "food",
    observation: "閉店前のスイーツ店に、一組のカップルが駆け込んでいく。",
    observationEn: "A couple rushes into the patisserie just before it closes.",
    timeOpen: 11,
    timeClose: 20,
    periodBoost: ["sunset"],
    dayBoost: ["saturday", "sunday"],
  },

  // ── 中野 Nakano ──────────────────────────────────────────────────────
  {
    id: "nakano-bar-01",
    neighborhood: "中野",
    neighborhoodEn: "Nakano",
    station: "中野",
    stationEn: "Nakano",
    walkMinutes: 5,
    coords: [35.7058, 139.6638],
    type: "bar",
    observation: "ブロードウェイの裏路地で、常連だけが知る店に灯りがともる。",
    observationEn: "A light comes on in the back-alley bar only regulars know about.",
    timeOpen: 18,
    timeClose: 1,
    periodBoost: ["evening", "night"],
  },
  {
    id: "nakano-film-01",
    neighborhood: "中野",
    neighborhoodEn: "Nakano",
    station: "中野",
    stationEn: "Nakano",
    walkMinutes: 6,
    coords: [35.7065, 139.6649],
    type: "film",
    observation: "小さな映画館の看板が、雨に濡れて光っている。",
    observationEn: "The tiny cinema's marquee shines wet in the rain.",
    timeOpen: 14,
    timeClose: 22,
    periodBoost: ["evening", "night"],
    weatherBoost: ["rainy", "cloudy"],
  },

  // ── 代々木 Yoyogi ──────────────────────────────────────────────────────
  {
    id: "yoyogi-market-01",
    neighborhood: "代々木",
    neighborhoodEn: "Yoyogi",
    station: "代々木",
    stationEn: "Yoyogi",
    walkMinutes: 5,
    coords: [35.6836, 139.7022],
    type: "market",
    observation: "公園の出口付近に、週末だけ現れる花屋がいる。",
    observationEn: "A flower seller who only appears at weekends sets up near the park gate.",
    timeOpen: 10,
    timeClose: 18,
    periodBoost: ["morning", "daytime"],
    dayBoost: ["saturday", "sunday"],
  },

  // ── 恵比寿 Ebisu ──────────────────────────────────────────────────────
  {
    id: "ebisu-wine-01",
    neighborhood: "恵比寿",
    neighborhoodEn: "Ebisu",
    station: "恵比寿",
    stationEn: "Ebisu",
    walkMinutes: 5,
    coords: [35.6468, 139.7101],
    type: "bar",
    observation: "ワインバーの外に、グラスを持ったまま立っている人がいる。",
    observationEn: "Someone standing outside the wine bar, glass in hand, watching the street.",
    timeOpen: 17,
    timeClose: 1,
    periodBoost: ["evening", "night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 渋谷 Shibuya ──────────────────────────────────────────────────────
  {
    id: "shibuya-record-01",
    neighborhood: "渋谷",
    neighborhoodEn: "Shibuya",
    station: "渋谷",
    stationEn: "Shibuya",
    walkMinutes: 7,
    coords: [35.6582, 139.7011],
    type: "book",
    observation: "夜の中古レコード店、試聴機の前でずっと耳を傾けている。",
    observationEn: "Late at the second-hand record shop, someone has been at the listening booth for a while.",
    timeOpen: 11,
    timeClose: 21,
    periodBoost: ["evening"],
  },
  {
    id: "shibuya-jazz-01",
    neighborhood: "渋谷",
    neighborhoodEn: "Shibuya",
    station: "渋谷",
    stationEn: "Shibuya",
    walkMinutes: 8,
    coords: [35.6599, 139.7027],
    type: "jazz",
    observation: "ビルの地下から、サックスの音が地上まで届いてくる。",
    observationEn: "A saxophone drifts up from the basement all the way to street level.",
    timeOpen: 20,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 六本木 Roppongi ───────────────────────────────────────────────────
  {
    id: "roppongi-gallery-01",
    neighborhood: "六本木",
    neighborhoodEn: "Roppongi",
    station: "六本木",
    stationEn: "Roppongi",
    walkMinutes: 4,
    coords: [35.6628, 139.7313],
    type: "art",
    observation: "深夜まで開いているギャラリーで、誰かが床に腰を下ろして作品と向き合っている。",
    observationEn: "The gallery is open past midnight — someone sitting on the floor, face to face with a work.",
    timeOpen: 11,
    timeClose: 23,
    periodBoost: ["night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 吉祥寺 Kichijoji ──────────────────────────────────────────────────
  {
    id: "kichijoji-jazz-01",
    neighborhood: "吉祥寺",
    neighborhoodEn: "Kichijoji",
    station: "吉祥寺",
    stationEn: "Kichijoji",
    walkMinutes: 5,
    coords: [35.7027, 139.5797],
    type: "jazz",
    observation: "ハーモニカ横丁の奥で、まだ演奏が続いている。",
    observationEn: "Deep in Harmonica Alley, a set that won't end.",
    timeOpen: 19,
    timeClose: 1,
    periodBoost: ["night"],
    dayBoost: ["friday", "saturday"],
  },
  {
    id: "kichijoji-book-01",
    neighborhood: "吉祥寺",
    neighborhoodEn: "Kichijoji",
    station: "吉祥寺",
    stationEn: "Kichijoji",
    walkMinutes: 4,
    coords: [35.7035, 139.5805],
    type: "book",
    observation: "古本屋の主人が、奥で本を読みながら閉店時間を忘れている。",
    observationEn: "The secondhand bookshop owner is reading in the back, oblivious to closing time.",
    timeOpen: 12,
    timeClose: 20,
    periodBoost: ["daytime", "sunset", "evening"],
  },

  // ── 表参道 Omotesando ─────────────────────────────────────────────────
  {
    id: "omotesando-gallery-01",
    neighborhood: "表参道",
    neighborhoodEn: "Omotesando",
    station: "表参道",
    stationEn: "Omotesando",
    walkMinutes: 3,
    coords: [35.6653, 139.7128],
    type: "art",
    observation: "ケヤキ並木の下を、傘を持たずに歩いていく人がいる。",
    observationEn: "Someone walks under the zelkova trees without an umbrella, not minding the rain.",
    timeOpen: 11,
    timeClose: 21,
    periodBoost: ["evening"],
    weatherBoost: ["rainy"],
  },

  // ── 日本橋 Nihonbashi ─────────────────────────────────────────────────
  {
    id: "nihonbashi-bridge-01",
    neighborhood: "日本橋",
    neighborhoodEn: "Nihonbashi",
    station: "日本橋",
    stationEn: "Nihonbashi",
    walkMinutes: 3,
    coords: [35.6839, 139.7742],
    type: "art",
    observation: "橋の上に立って、水面の光をしばらく見ている人がいる。",
    observationEn: "Someone standing on the bridge, watching the lights reflected in the water below.",
    timeOpen: 0,
    timeClose: 23,
    periodBoost: ["night", "latenight", "evening"],
    weatherBoost: ["clear"],
  },

  // ── 蔵前 Kuramae ──────────────────────────────────────────────────────
  {
    id: "kuramae-craft-01",
    neighborhood: "蔵前",
    neighborhoodEn: "Kuramae",
    station: "蔵前",
    stationEn: "Kuramae",
    walkMinutes: 4,
    coords: [35.7069, 139.7892],
    type: "popup",
    observation: "職人の工房から、木を削る音が夕方の通りに漏れてくる。",
    observationEn: "The sound of wood being carved drifts out of the craftsman's workshop into the evening street.",
    timeOpen: 11,
    timeClose: 19,
    periodBoost: ["daytime", "sunset"],
  },

  // ── 根津 Nezu ─────────────────────────────────────────────────────────
  {
    id: "nezu-shrine-01",
    neighborhood: "根津",
    neighborhoodEn: "Nezu",
    station: "根津",
    stationEn: "Nezu",
    walkMinutes: 5,
    coords: [35.7204, 139.7619],
    type: "art",
    observation: "夜の神社、参道の石灯籠だけが静かに灯っている。",
    observationEn: "The stone lanterns along the shrine path are the only lights, burning quietly.",
    timeOpen: 0,
    timeClose: 23,
    periodBoost: ["night", "evening"],
    weatherBoost: ["foggy", "clear"],
  },

  // ── 向島 Mukojima ─────────────────────────────────────────────────────
  {
    id: "mukojima-izakaya-01",
    neighborhood: "向島",
    neighborhoodEn: "Mukojima",
    station: "曳舟",
    stationEn: "Hikifune",
    walkMinutes: 8,
    coords: [35.7162, 139.8121],
    type: "food",
    observation: "昭和の居酒屋に、今夜も同じ顔が並んでいる。",
    observationEn: "The same faces as always lined up at the Showa-era izakaya tonight.",
    timeOpen: 17,
    timeClose: 22,
    periodBoost: ["evening"],
    dayBoost: ["weekday"],
  },

  // ── 北千住 Kita-Senju ─────────────────────────────────────────────────
  {
    id: "kita-senju-jazz-01",
    neighborhood: "北千住",
    neighborhoodEn: "Kita-Senju",
    station: "北千住",
    stationEn: "Kita-Senju",
    walkMinutes: 6,
    coords: [35.7494, 139.8007],
    type: "jazz",
    observation: "終電後の路地に、一軒だけ窓が光っている。",
    observationEn: "After the last train, one window is still lit in the alley.",
    timeOpen: 21,
    timeClose: 4,
    periodBoost: ["night", "latenight"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 浜松町 Hamamatsucho ───────────────────────────────────────────────
  {
    id: "hamamatsucho-bay-01",
    neighborhood: "浜松町",
    neighborhoodEn: "Hamamatsucho",
    station: "浜松町",
    stationEn: "Hamamatsucho",
    walkMinutes: 7,
    coords: [35.6553, 139.7566],
    type: "bar",
    observation: "湾岸の風が強い夜、一人でビールを飲んでいる人がいる。",
    observationEn: "A strong wind off the bay — one person drinking a beer alone, leaning into it.",
    timeOpen: 17,
    timeClose: 23,
    periodBoost: ["evening", "night"],
    weatherBoost: ["clear", "cloudy"],
  },
];

// ── Seeded pseudo-random number generator (mulberry32) ────────────────────────

function seededRng(seed: number): () => number {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Signal activity check ─────────────────────────────────────────────────────

function isSignalActive(signal: TonightSignal, hour: number): boolean {
  const { timeOpen, timeClose } = signal;

  // Currently open
  if (timeOpen <= timeClose) {
    // Normal range e.g. 10–22
    if (hour >= timeOpen && hour < timeClose) return true;
  } else {
    // Overnight e.g. 20–02
    if (hour >= timeOpen || hour < timeClose) return true;
  }

  // Opening within 4 hours
  const hoursUntilOpen = (timeOpen - hour + 24) % 24;
  if (hoursUntilOpen > 0 && hoursUntilOpen <= 4) return true;

  // Closing before 6am — include for late-night context
  if (hour < 5 && timeClose >= 0 && timeClose <= 6) return true;

  return false;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreSignal(
  signal: TonightSignal,
  condition: string,
  period: string,
  dayType: "weekday" | "friday" | "saturday" | "sunday",
): number {
  let score = 0;
  if (signal.weatherBoost?.includes(condition as "clear")) score += 2;
  if (signal.periodBoost?.includes(period as "night")) score += 2;
  if (signal.dayBoost?.includes(dayType)) score += 2;
  return score;
}

// ── Public selection function ─────────────────────────────────────────────────

export function getTonightSignals(
  hour: number,
  condition: string,
  period: string,
  dayType: "weekday" | "friday" | "saturday" | "sunday",
): TonightSignal[] {
  // Daily Tokyo seed — changes each calendar day in Tokyo time
  const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const rng = seededRng(dailySeed);

  // Filter to active signals
  const active = ALL_SIGNALS.filter((s) => isSignalActive(s, hour));

  // Score each, adding small seeded noise for variety within tied scores
  const scored = active.map((s) => ({
    signal: s,
    score: scoreSignal(s, condition, period, dayType) + rng() * 0.5,
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top candidates then seeded-shuffle to vary order
  const topN = Math.min(scored.length, 12);
  const candidates = scored.slice(0, topN).map((s) => s.signal);

  const rng2 = seededRng(dailySeed ^ 0xdeadbeef);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(rng2() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  // Pick 4–7 signals
  const count = 4 + Math.floor(rng2() * 4);
  return candidates.slice(0, Math.min(count, candidates.length));
}

// ── Maps URL helper ───────────────────────────────────────────────────────────

export function getSignalMapsUrl(signal: TonightSignal): string {
  return `https://www.google.com/maps/search/?api=1&query=${signal.coords[0]},${signal.coords[1]}`;
}
