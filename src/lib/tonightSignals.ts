export type SignalType =
  | "jazz"
  | "live"
  | "bar"
  | "food"
  | "market"
  | "book"
  | "art"
  | "convenience";

export type WeatherCondition =
  | "clear"
  | "sunny"
  | "cloudy"
  | "overcast"
  | "rainy"
  | "foggy"
  | "snowy"
  | "cold"
  | "humid";

export type Period =
  | "dawn"
  | "morning"
  | "daytime"
  | "sunset"
  | "evening"
  | "night"
  | "latenight";

export type DayType = "weekday" | "friday" | "saturday" | "sunday";

export interface TonightSignal {
  id: string;

  // Venue identity
  venueName: string;         // Primary name (Japanese or original)
  venueNameEn: string;       // English / Romanized
  venueNameZh?: string;      // Traditional Chinese (if different)

  // Location
  neighborhood: string;      // 中目黒
  neighborhoodEn: string;    // Nakameguro
  station: string;           // 中目黒
  stationEn: string;         // Nakameguro
  walkMinutes: number;       // 0 = not applicable (convenience stores etc.)
  address: string;           // Japanese address (brief)
  addressEn: string;         // English address
  coords: [number, number];  // [lat, lng]

  type: SignalType;

  // Layer 1 — why people are going tonight (crowd reason or limited item)
  crowdReason?: string;
  crowdReasonEn?: string;
  crowdReasonZh?: string;

  limitedItem?: string;
  limitedItemEn?: string;
  limitedItemZh?: string;

  // Layer 2 — observation (atmosphere; what you'd notice standing outside)
  observation: string;
  observationEn: string;
  observationZh?: string;

  // Credibility whispers — rendered tiny, never the visual star
  rating?: number;           // 4.7
  crowdNote?: string;
  crowdNoteEn?: string;
  crowdNoteZh?: string;
  recentBuzz?: string;
  recentBuzzEn?: string;
  recentBuzzZh?: string;

  timeOpen: number;          // Tokyo hour 0–23
  timeClose: number;         // Can be < timeOpen for overnight

  weatherBoost?: WeatherCondition[];
  periodBoost?: Period[];
  dayBoost?: DayType[];
}

// ── Signal pool ──────────────────────────────────────────────────────────────

export const ALL_SIGNALS: TonightSignal[] = [

  // ── ONIBUS COFFEE 中目黒 ─────────────────────────────────────────────────
  {
    id: "onibus-nakameguro",
    venueName: "ONIBUS COFFEE 中目黒",
    venueNameEn: "ONIBUS COFFEE Nakameguro",
    venueNameZh: "ONIBUS COFFEE 中目黒",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 3,
    address: "東京都目黒区上目黒 2-14-1",
    addressEn: "2-14-1 Kami-Meguro, Meguro-ku",
    coords: [35.6428, 139.6977],
    type: "food",
    crowdReason: "今日は新しいエスプレッソトニックを目当てに来た人が多い。",
    crowdReasonEn: "Many people came specifically for the new espresso tonic today.",
    crowdReasonZh: "今天很多人是為了那杯新的 espresso tonic 來的。",
    limitedItem: "今週から季節限定エスプレッソトニック。",
    limitedItemEn: "Seasonal espresso tonic, started this week.",
    limitedItemZh: "本週季節限定：espresso tonic 上市。",
    observation: "雨のせいか、店内が普段より明るく見える。",
    observationEn: "Rain makes the interior seem brighter than usual tonight.",
    observationZh: "下雨讓店裡比平常更亮。",
    rating: 4.7,
    crowdNote: "今夜は混んでいる",
    crowdNoteEn: "Busy tonight",
    crowdNoteZh: "今天晚上人很多",
    timeOpen: 9,
    timeClose: 19,
    weatherBoost: ["rainy", "overcast", "cloudy"],
    periodBoost: ["morning", "daytime", "evening"],
  },

  // ── Coffee Amp 高円寺 ─────────────────────────────────────────────────────
  {
    id: "coffee-amp-koenji",
    venueName: "Coffee Amp",
    venueNameEn: "Coffee Amp",
    venueNameZh: "Coffee Amp",
    neighborhood: "高円寺",
    neighborhoodEn: "Koenji",
    station: "高円寺",
    stationEn: "Koenji",
    walkMinutes: 4,
    address: "東京都杉並区高円寺北 3 丁目",
    addressEn: "Koenji-kita, Suginami-ku",
    coords: [35.7057, 139.6493],
    type: "bar",
    limitedItem: "今週の深夜プリンは限定フレーバー。",
    limitedItemEn: "This week's late-night pudding is a limited flavor.",
    limitedItemZh: "這週的深夜布丁是限定口味。",
    observation: "閉店後も店の外で立ち話をしている人が何人かいる。",
    observationEn: "A few people still outside chatting, past when they should leave.",
    observationZh: "很多人下班後還停在外面聊天。",
    rating: 4.6,
    recentBuzz: "最近東京のコーヒーコミュニティで話題",
    recentBuzzEn: "Often mentioned in Tokyo coffee circles lately",
    recentBuzzZh: "最近在東京咖啡圈很常被提到",
    timeOpen: 18,
    timeClose: 3,
    periodBoost: ["night", "latenight"],
  },

  // ── 新宿 PIT INN ──────────────────────────────────────────────────────────
  {
    id: "shinjuku-pit-inn",
    venueName: "新宿 PIT INN",
    venueNameEn: "Shinjuku Pit Inn",
    venueNameZh: "新宿 PIT INN",
    neighborhood: "新宿",
    neighborhoodEn: "Shinjuku",
    station: "新宿三丁目",
    stationEn: "Shinjuku-sanchome",
    walkMinutes: 3,
    address: "東京都新宿区新宿 2-12-4 アコード新宿 B1",
    addressEn: "Accord Shinjuku B1, 2-12-4 Shinjuku, Shinjuku-ku",
    coords: [35.6916, 139.7041],
    type: "jazz",
    crowdReason: "今夜の第二部は今月で最も予約が入っているライブ。",
    crowdReasonEn: "Tonight's second set has the most reservations this month.",
    crowdReasonZh: "今晚的二部演出是這個月訂位最多的一場。",
    observation: "地下への階段を降りるにつれて、音がよくなってくる。",
    observationEn: "Walking down to the basement, the sound keeps getting better.",
    observationZh: "走下地下室的樓梯，音樂越來越對。",
    rating: 4.8,
    crowdNote: "ほぼ毎回満席",
    crowdNoteEn: "Almost always full",
    crowdNoteZh: "幾乎每次都客滿",
    timeOpen: 19,
    timeClose: 24,
    periodBoost: ["night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── Bonus Track 下北沢 ────────────────────────────────────────────────────
  {
    id: "bonus-track-shimokita",
    venueName: "Bonus Track",
    venueNameEn: "Bonus Track",
    venueNameZh: "Bonus Track",
    neighborhood: "下北沢",
    neighborhoodEn: "Shimokitazawa",
    station: "下北沢",
    stationEn: "Shimokitazawa",
    walkMinutes: 5,
    address: "東京都世田谷区代田 2-36-12",
    addressEn: "2-36-12 Daita, Setagaya-ku",
    coords: [35.6603, 139.6676],
    type: "market",
    crowdReason: "週末の夜間古書市に、他の区からも人が来ている。",
    crowdReasonEn: "The late-night used book market draws people from other neighborhoods.",
    crowdReasonZh: "週末的深夜古書市吸引很多人特地從其他區過來。",
    limitedItem: "今夜は 21 時まで夜間古書展開催。",
    limitedItemEn: "Late-night used book fair until 21:00 tonight.",
    limitedItemZh: "今晚到 21:00 限定古書展。",
    observation: "屋外の通路で、誰かがアコースティックギターを弾いている。店はまだ開いている。",
    observationEn: "Someone playing acoustic guitar in the outdoor passage. Shops still open.",
    observationZh: "露天通道裡有人在彈吉他，店還開著。",
    rating: 4.6,
    crowdNote: "週末の夜は人が多い",
    crowdNoteEn: "Heavy foot traffic on weekend nights",
    crowdNoteZh: "週末夜間人流大",
    timeOpen: 11,
    timeClose: 22,
    periodBoost: ["evening", "night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── 中目黒タップルーム ────────────────────────────────────────────────────
  {
    id: "nakameguro-taproom",
    venueName: "中目黒タップルーム",
    venueNameEn: "Nakameguro Taproom",
    venueNameZh: "中目黒 Taproom",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 2,
    address: "東京都目黒区上目黒 1-18-11",
    addressEn: "1-18-11 Kami-Meguro, Meguro-ku",
    coords: [35.6435, 139.6991],
    type: "bar",
    crowdReason: "今週から新しい限定クラフトビールが入り、目当てに来た人が多い。",
    crowdReasonEn: "A new limited craft beer arrived this week — many came specifically for it.",
    crowdReasonZh: "這週新進了一款限定精釀，很多人特地來嘗。",
    limitedItem: "今週から新樽のクラフトビール。",
    limitedItemEn: "New craft beer keg tapped this week.",
    limitedItemZh: "本週新桶精釀上架。",
    observation: "川沿いのテーブルにまだ何人かが残っている。",
    observationEn: "A few people still at the riverside tables.",
    observationZh: "川邊的座位還有人。",
    rating: 4.5,
    recentBuzz: "川沿いの席が好きな人に知られている",
    recentBuzzEn: "Known to those who love the riverside",
    recentBuzzZh: "識貨的人才知道的川邊位子",
    timeOpen: 17,
    timeClose: 24,
    periodBoost: ["evening", "night"],
    weatherBoost: ["clear", "cloudy"],
  },

  // ── Bar Bossa 渋谷 ────────────────────────────────────────────────────────
  {
    id: "bar-bossa-shibuya",
    venueName: "Bar Bossa",
    venueNameEn: "Bar Bossa",
    venueNameZh: "Bar Bossa",
    neighborhood: "渋谷",
    neighborhoodEn: "Shibuya",
    station: "渋谷",
    stationEn: "Shibuya",
    walkMinutes: 8,
    address: "東京都渋谷区宇田川町 1-6",
    addressEn: "1-6 Udagawacho, Shibuya-ku",
    coords: [35.6614, 139.6973],
    type: "bar",
    crowdReason: "今夜の DJ セットは告知なし、急に決まった演奏。",
    crowdReasonEn: "Tonight's DJ set wasn't announced — the owner decided on impulse.",
    crowdReasonZh: "今晚的 DJ set 沒有事先宣傳，是店主臨時起意的。",
    observation: "小さな窓からボサノバが漏れている。",
    observationEn: "Bossa nova leaking through the small window onto the street.",
    observationZh: "小小的窗戶透出 bossa nova。",
    rating: 4.6,
    crowdNote: "不定期の演奏はいつも混む",
    crowdNoteEn: "Impromptu sets are always packed",
    crowdNoteZh: "臨時演出場場客滿",
    timeOpen: 18,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
  },

  // ── DUG 新宿 ──────────────────────────────────────────────────────────────
  {
    id: "dug-shinjuku",
    venueName: "DUG",
    venueNameEn: "DUG",
    venueNameZh: "DUG",
    neighborhood: "新宿",
    neighborhoodEn: "Shinjuku",
    station: "新宿三丁目",
    stationEn: "Shinjuku-sanchome",
    walkMinutes: 5,
    address: "東京都新宿区新宿 3-15-12",
    addressEn: "3-15-12 Shinjuku, Shinjuku-ku",
    coords: [35.6918, 139.7053],
    type: "jazz",
    crowdReason: "最近、雑誌の記事で取り上げられてから初来店の人が増えている。",
    crowdReasonEn: "Since a recent magazine feature, first-timers keep finding their way here.",
    crowdReasonZh: "最近被一篇文章提到之後，第一次來的人變多了。",
    observation: "地下への階段にジャズの音が漏れている。",
    observationEn: "Jazz leaking out from the basement stairwell.",
    observationZh: "地下室的樓梯透出爵士樂。",
    rating: 4.7,
    recentBuzz: "ジャズ好きの間では言わずもがな",
    recentBuzzEn: "A given for any Tokyo jazz lover",
    recentBuzzZh: "愛爵士的人不需要介紹",
    timeOpen: 12,
    timeClose: 24,
    periodBoost: ["evening", "night"],
  },

  // ── 谷中ビアホール ────────────────────────────────────────────────────────
  {
    id: "yanaka-beer-hall",
    venueName: "谷中ビアホール",
    venueNameEn: "Yanaka Beer Hall",
    venueNameZh: "谷中啤酒廳",
    neighborhood: "谷中",
    neighborhoodEn: "Yanaka",
    station: "日暮里",
    stationEn: "Nippori",
    walkMinutes: 6,
    address: "東京都台東区谷中 3-9-1",
    addressEn: "3-9-1 Yanaka, Taito-ku",
    coords: [35.7272, 139.7670],
    type: "bar",
    crowdReason: "谷中の夜は歩くのが気持ちいいので、散歩のついでに寄る人が多い。",
    crowdReasonEn: "Yanaka is pleasant to walk through at night — many stop in during a stroll.",
    crowdReasonZh: "谷中的夜晚走起來很舒服，很多人散步時順道來。",
    observation: "古い商店街の灯りが温かい。",
    observationEn: "The lights of the old shotengai feel warm from outside.",
    observationZh: "老商店街裡的燈光很溫暖。",
    rating: 4.5,
    recentBuzz: "夕方以降の谷中散歩の定番",
    recentBuzzEn: "A Yanaka evening walk staple",
    recentBuzzZh: "傍晚谷中散步的固定一站",
    timeOpen: 16,
    timeClose: 22,
    periodBoost: ["evening"],
    weatherBoost: ["clear", "cloudy"],
  },

  // ── ディスクユニオン 高円寺 ───────────────────────────────────────────────
  {
    id: "disk-union-koenji",
    venueName: "ディスクユニオン 高円寺店",
    venueNameEn: "Disk Union Koenji",
    venueNameZh: "Disk Union 高円寺",
    neighborhood: "高円寺",
    neighborhoodEn: "Koenji",
    station: "高円寺",
    stationEn: "Koenji",
    walkMinutes: 3,
    address: "東京都杉並区高円寺北 3-1-1",
    addressEn: "3-1-1 Koenji-kita, Suginami-ku",
    coords: [35.7053, 139.6497],
    type: "book",
    crowdReason: "SNS で、ここで見つけた希少レコードが話題になっている。",
    crowdReasonEn: "Someone shared a rare vinyl find here on social media — people have been coming since.",
    crowdReasonZh: "最近有人在社群分享了在這裡找到的稀有黑膠，引來更多人。",
    limitedItem: "今週は高円寺店限定のセール品あり。",
    limitedItemEn: "Koenji branch exclusive sale items this week.",
    limitedItemZh: "本週高円寺限定特價品。",
    observation: "閉店 1 時間前、じっくり掘る人がまだいる。",
    observationEn: "Someone digging through the bins, unhurried, with an hour until closing.",
    observationZh: "閉店前一小時，還有人慢慢在翻。",
    rating: 4.6,
    crowdNote: "夕方以降の入りが多い",
    crowdNoteEn: "Busier after evening",
    crowdNoteZh: "傍晚後客人比較多",
    timeOpen: 11,
    timeClose: 21,
    periodBoost: ["evening"],
  },

  // ── ほうき星 荻窪 ─────────────────────────────────────────────────────────
  {
    id: "houkiboshi-ogikubo",
    venueName: "ほうき星",
    venueNameEn: "Houkiboshi",
    venueNameZh: "ほうき星",
    neighborhood: "荻窪",
    neighborhoodEn: "Ogikubo",
    station: "荻窪",
    stationEn: "Ogikubo",
    walkMinutes: 5,
    address: "東京都杉並区荻窪 5 丁目",
    addressEn: "Ogikubo 5-chome, Suginami-ku",
    coords: [35.7035, 139.6206],
    type: "bar",
    crowdReason: "最近、この店が東京で一番自分に合っている場所だと言う人が増えている。",
    crowdReasonEn: "More people are saying lately this is the place in Tokyo that fits them most.",
    crowdReasonZh: "最近很多人說這家店是他們在東京找到最對味的地方。",
    observation: "路地の奥にある灯りが、遠くから見える。",
    observationEn: "The light at the end of the alley, visible from far away.",
    observationZh: "小巷深處的燈光，遠遠就能看到。",
    rating: 4.7,
    recentBuzz: "知る人ぞ知る荻窪の夜",
    recentBuzzEn: "Ogikubo at night, for those who know",
    recentBuzzZh: "識貨的人才知道的荻窪夜晚",
    timeOpen: 19,
    timeClose: 1,
    periodBoost: ["night", "latenight"],
  },

  // ── 代官山 蔦屋書店 ───────────────────────────────────────────────────────
  {
    id: "daikanyama-tsite",
    venueName: "代官山 蔦屋書店",
    venueNameEn: "Daikanyama T-Site",
    venueNameZh: "代官山 蔦屋書店",
    neighborhood: "代官山",
    neighborhoodEn: "Daikanyama",
    station: "代官山",
    stationEn: "Daikanyama",
    walkMinutes: 2,
    address: "東京都渋谷区猿楽町 17-5",
    addressEn: "17-5 Sarugakucho, Shibuya-ku",
    coords: [35.6484, 139.6986],
    type: "book",
    crowdReason: "今月のフェア選書について、本好きの間で話題になっている。",
    crowdReasonEn: "This month's curated selection has been discussed in book circles.",
    crowdReasonZh: "這個月的選書在書迷之間討論很熱。",
    limitedItem: "今月のフェア：旅の本 100 冊。",
    limitedItemEn: "This month's fair: 100 travel books.",
    limitedItemZh: "本月特展：100 本旅行書。",
    observation: "深夜の書店は、迷いながら選ぶ人のためにある。",
    observationEn: "The late-night bookstore exists for slow choosers.",
    observationZh: "深夜書店是為還在猶豫的人開的。",
    rating: 4.8,
    crowdNote: "深夜でも人が来る",
    crowdNoteEn: "People come even late at night",
    crowdNoteZh: "深夜也有人來",
    timeOpen: 7,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
  },

  // ── 西荻窪 骨董通り ───────────────────────────────────────────────────────
  {
    id: "nishi-ogikubo-antique",
    venueName: "西荻窪 骨董通り",
    venueNameEn: "Nishi-Ogikubo Antique Street",
    venueNameZh: "西荻窪 古董街",
    neighborhood: "西荻窪",
    neighborhoodEn: "Nishi-Ogikubo",
    station: "西荻窪",
    stationEn: "Nishi-Ogikubo",
    walkMinutes: 3,
    address: "東京都杉並区西荻南 3 丁目",
    addressEn: "Nishi-Ogikubo, Suginami-ku",
    coords: [35.7022, 139.6069],
    type: "art",
    crowdReason: "今夕、誰かがここで見つけたものを SNS に投稿して、気になった人が来ている。",
    crowdReasonEn: "Someone posted their find from here this evening — curious people have been arriving.",
    crowdReasonZh: "今晚有人在 Instagram 分享了在這裡找到的東西，引來更多人。",
    observation: "裸電球の下に骨董品が並んでいる。閉店時間を過ぎても主人がいる。",
    observationEn: "Antiques lined up under bare bulbs. The owner still there past closing.",
    observationZh: "電燈泡下擺滿古董。關門時間過了主人還在。",
    rating: 4.5,
    recentBuzz: "西荻の夜散歩のついでに来る人が多い",
    recentBuzzEn: "Many stop by during an evening walk around Nishi-Ogikubo",
    recentBuzzZh: "西荻晚間散步的順道必訪",
    timeOpen: 14,
    timeClose: 21,
    periodBoost: ["evening"],
    weatherBoost: ["clear", "cloudy"],
  },

  // ── 目黒川沿い ────────────────────────────────────────────────────────────
  {
    id: "meguro-river-night",
    venueName: "目黒川沿い",
    venueNameEn: "Meguro River Walk",
    venueNameZh: "目黒川沿岸",
    neighborhood: "中目黒",
    neighborhoodEn: "Nakameguro",
    station: "中目黒",
    stationEn: "Nakameguro",
    walkMinutes: 1,
    address: "東京都目黒区上目黒",
    addressEn: "Kami-Meguro, Meguro-ku",
    coords: [35.6440, 139.6980],
    type: "art",
    crowdReason: "夜の目黒川は静かに歩くのに向いている。最近それを知った人が増えている。",
    crowdReasonEn: "The Meguro River at night is perfect for a quiet walk. More people have been discovering this.",
    crowdReasonZh: "夜晚的目黒川很適合靜靜地走。最近發現這件事的人越來越多。",
    observation: "川面に灯りが映っている。橋の上で立ち止まっている人がいる。",
    observationEn: "Lights reflecting on the water. Someone stopped on the bridge, watching.",
    observationZh: "燈光倒映在水面。有人停在橋上看。",
    rating: 4.6,
    timeOpen: 17,
    timeClose: 24,
    periodBoost: ["evening", "night"],
    weatherBoost: ["clear", "cloudy"],
  },

  // ── 下北沢 SHELTER ────────────────────────────────────────────────────────
  {
    id: "shimokita-shelter",
    venueName: "下北沢 SHELTER",
    venueNameEn: "Shimokitazawa SHELTER",
    venueNameZh: "下北沢 SHELTER",
    neighborhood: "下北沢",
    neighborhoodEn: "Shimokitazawa",
    station: "下北沢",
    stationEn: "Shimokitazawa",
    walkMinutes: 4,
    address: "東京都世田谷区北沢 2-6-10 鈴音ビル B1",
    addressEn: "Suzune Bldg B1, 2-6-10 Kitazawa, Setagaya-ku",
    coords: [35.6615, 139.6674],
    type: "live",
    crowdReason: "今夜のバンドは今年で最も話題になっているライブのひとつ。",
    crowdReasonEn: "Tonight's band is one of the most talked-about shows this year.",
    crowdReasonZh: "今晚的樂團是今年討論最多的演出之一。",
    observation: "扉の隙間から音が漏れている。外で待っている人もいる。",
    observationEn: "Sound bleeding through the gap in the door. A few people waiting outside.",
    observationZh: "門縫透出音樂。外面也有人在等。",
    rating: 4.7,
    crowdNote: "今夜はほぼ満員",
    crowdNoteEn: "Nearly sold out tonight",
    crowdNoteZh: "今晚幾乎滿場",
    timeOpen: 18,
    timeClose: 1,
    periodBoost: ["night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── Bar Trench 恵比寿 ─────────────────────────────────────────────────────
  {
    id: "bar-trench-ebisu",
    venueName: "Bar Trench",
    venueNameEn: "Bar Trench",
    venueNameZh: "Bar Trench",
    neighborhood: "恵比寿",
    neighborhoodEn: "Ebisu",
    station: "恵比寿",
    stationEn: "Ebisu",
    walkMinutes: 7,
    address: "東京都渋谷区恵比寿西 1-5-8",
    addressEn: "1-5-8 Ebisu-nishi, Shibuya-ku",
    coords: [35.6468, 139.7101],
    type: "bar",
    crowdReason: "最近バーテンダーの投稿が話題になってから初来店の人が増えている。",
    crowdReasonEn: "After the bartender's recent post went viral, first-timers keep arriving.",
    crowdReasonZh: "最近調酒師的 IG 爆紅之後，第一次來的人變多了。",
    observation: "小さな路地の奥にある。扉を開けると別世界。",
    observationEn: "Deep in a small alley. Opening the door feels like entering another world.",
    observationZh: "在小巷深處。推開門像進入另一個世界。",
    rating: 4.7,
    recentBuzz: "知る人ぞ知る恵比寿の一軒",
    recentBuzzEn: "Ebisu's best-kept secret",
    recentBuzzZh: "恵比寿最值得知道的一間",
    timeOpen: 19,
    timeClose: 2,
    periodBoost: ["night", "latenight"],
  },

  // ── モンブラン 自由が丘 ───────────────────────────────────────────────────
  {
    id: "montblanc-jiyugaoka",
    venueName: "モンブラン 自由が丘本店",
    venueNameEn: "Mont-Blanc Jiyugaoka",
    venueNameZh: "Mont-Blanc 自由が丘本店",
    neighborhood: "自由が丘",
    neighborhoodEn: "Jiyugaoka",
    station: "自由が丘",
    stationEn: "Jiyugaoka",
    walkMinutes: 2,
    address: "東京都目黒区自由が丘 1-29-3",
    addressEn: "1-29-3 Jiyugaoka, Meguro-ku",
    coords: [35.6081, 139.6659],
    type: "food",
    limitedItem: "今月の季節モンブランは栗が深い。",
    limitedItemEn: "This month's seasonal Mont Blanc is deeply chestnut-forward.",
    limitedItemZh: "本月季節限定栗子蒙布朗，栗味很深。",
    crowdReason: "今日は閉店 1 時間前でも行列があった。",
    crowdReasonEn: "There was still a line an hour before closing today.",
    crowdReasonZh: "今天關門前一小時還有人在排。",
    observation: "ショーケースに最後の数個が残っている。",
    observationEn: "The last few pieces remain in the display case.",
    observationZh: "展示櫃裡只剩最後幾個。",
    rating: 4.7,
    recentBuzz: "自由が丘の秋の定番として長く続いている",
    recentBuzzEn: "A Jiyugaoka autumn institution that endures",
    recentBuzzZh: "自由が丘秋天的經典，每年都在",
    timeOpen: 10,
    timeClose: 19,
    periodBoost: ["daytime", "evening"],
  },

  // ── 神楽坂 かくれんぼ横丁 ────────────────────────────────────────────────
  {
    id: "kagurazaka-kakurenbo",
    venueName: "神楽坂 かくれんぼ横丁",
    venueNameEn: "Kagurazaka Kakurenbo Alley",
    venueNameZh: "神楽坂 かくれんぼ横丁",
    neighborhood: "神楽坂",
    neighborhoodEn: "Kagurazaka",
    station: "神楽坂",
    stationEn: "Kagurazaka",
    walkMinutes: 3,
    address: "東京都新宿区神楽坂 3 丁目",
    addressEn: "Kagurazaka 3-chome, Shinjuku-ku",
    coords: [35.7010, 139.7433],
    type: "bar",
    crowdReason: "石畳の路地の夜は、日中とは別の顔がある。",
    crowdReasonEn: "The cobblestone alley at night has a face you won't see in the day.",
    crowdReasonZh: "石板路小巷夜晚的樣子和白天完全不同。",
    observation: "石畳に、ひとつひとつの灯りが小さく灯っている。",
    observationEn: "Small lights glowing one by one along the stone-paved alley.",
    observationZh: "石板路上，一盞一盞的小燈亮著。",
    rating: 4.7,
    recentBuzz: "東京の路地裏文化を知りたい人が来る",
    recentBuzzEn: "A destination for those seeking Tokyo's hidden alley culture",
    recentBuzzZh: "想了解東京小巷文化的人來這裡",
    timeOpen: 18,
    timeClose: 24,
    periodBoost: ["evening", "night"],
    weatherBoost: ["clear", "cloudy", "overcast"],
  },

  // ── 高円寺 中通り商店街 ───────────────────────────────────────────────────
  {
    id: "koenji-middle-arcade",
    venueName: "高円寺 中通り商店街",
    venueNameEn: "Koenji Middle Arcade",
    venueNameZh: "高円寺中通り商店街",
    neighborhood: "高円寺",
    neighborhoodEn: "Koenji",
    station: "高円寺",
    stationEn: "Koenji",
    walkMinutes: 2,
    address: "東京都杉並区高円寺北 2 丁目",
    addressEn: "Koenji-kita, Suginami-ku",
    coords: [35.7046, 139.6490],
    type: "market",
    crowdReason: "金曜の夜の高円寺は独特のリズムがある。ただぶらぶらしに来る人が多い。",
    crowdReasonEn: "Friday night Koenji has its own rhythm. Many people just come to wander.",
    crowdReasonZh: "週五晚上的高円寺有自己的節奏，很多人就是來閒逛的。",
    observation: "古着屋の灯りと音楽が混ざって、夜の高円寺になる。",
    observationEn: "Vintage shop lights and music mixing into Koenji at night.",
    observationZh: "古著店的燈光和音樂混在一起，就是夜晚的高円寺。",
    rating: 4.6,
    crowdNote: "週末の夜は活気がある",
    crowdNoteEn: "Lively on weekend evenings",
    crowdNoteZh: "週末夜晚很有活力",
    timeOpen: 12,
    timeClose: 22,
    periodBoost: ["evening", "night"],
    dayBoost: ["friday", "saturday"],
  },

  // ── ローソン 新商品 ───────────────────────────────────────────────────────
  {
    id: "lawson-new-item",
    venueName: "ローソン",
    venueNameEn: "LAWSON",
    venueNameZh: "LAWSON",
    neighborhood: "どこでも",
    neighborhoodEn: "Everywhere",
    station: "",
    stationEn: "",
    walkMinutes: 0,
    address: "全国のローソン",
    addressEn: "LAWSON stores nationwide",
    coords: [35.6762, 139.6503],
    type: "convenience",
    limitedItem: "大人のなめらかプリン（本日発売）。",
    limitedItemEn: "Smooth Adult Pudding (on sale today).",
    limitedItemZh: "大人焦糖布丁（今日上市）。",
    crowdReason: "今日だけで SNS に千件以上の投稿が上がっている。",
    crowdReasonEn: "Over a thousand posts on Japanese social media about this today alone.",
    crowdReasonZh: "光今天在社群媒體就超過一千篇文章。",
    observation: "夜には売り切れている店舗も出始めている。",
    observationEn: "Some locations are already starting to run out tonight.",
    observationZh: "有些店今晚已開始售罄。",
    rating: 4.6,
    crowdNote: "今夜は早めに",
    crowdNoteEn: "Better go early tonight",
    crowdNoteZh: "今晚要早點去",
    timeOpen: 0,
    timeClose: 0,
    weatherBoost: ["rainy", "overcast"],
  },

  // ── セブン-イレブン 新商品 ────────────────────────────────────────────────
  {
    id: "seven-eleven-new-item",
    venueName: "セブン-イレブン",
    venueNameEn: "7-Eleven Japan",
    venueNameZh: "7-Eleven 日本",
    neighborhood: "どこでも",
    neighborhoodEn: "Everywhere",
    station: "",
    stationEn: "",
    walkMinutes: 0,
    address: "全国のセブン-イレブン",
    addressEn: "7-Eleven stores nationwide",
    coords: [35.6762, 139.6503],
    type: "convenience",
    limitedItem: "セブン限定：もちもちチーズタルト（今週発売）。",
    limitedItemEn: "7-Eleven exclusive: Mochi Cheese Tart (launched this week).",
    limitedItemZh: "7-Eleven 限定：麻糬起司塔（本週上市）。",
    crowdReason: "各地で持っている人を見かける。",
    crowdReasonEn: "Spotted in hands at stores all over Tokyo tonight.",
    crowdReasonZh: "今晚到處都看到有人拿著這個。",
    observation: "夜の棚には、これだけ目立って並んでいる。",
    observationEn: "On the night shelf, this one stands out.",
    observationZh: "在夜晚的貨架上，這個特別顯眼。",
    rating: 4.5,
    crowdNote: "今週の話題",
    crowdNoteEn: "This week's thing",
    crowdNoteZh: "本週的話題",
    timeOpen: 0,
    timeClose: 0,
  },

  // ── スターバックス 季節限定 ───────────────────────────────────────────────
  {
    id: "starbucks-seasonal",
    venueName: "スターバックス",
    venueNameEn: "Starbucks Japan",
    venueNameZh: "日本星巴克",
    neighborhood: "どこでも",
    neighborhoodEn: "Everywhere",
    station: "",
    stationEn: "",
    walkMinutes: 0,
    address: "全国のスターバックス",
    addressEn: "Starbucks locations across Japan",
    coords: [35.6762, 139.6503],
    type: "food",
    limitedItem: "夏季限定フラペチーノ 2 種、本日発売。",
    limitedItemEn: "Two new summer Frappuccinos launched today.",
    limitedItemZh: "夏季限定星冰樂 2 款，今日上市。",
    crowdReason: "開店から行列ができていた。今日はどの店舗も混雑している。",
    crowdReasonEn: "Lines formed at opening. Every location has been busy all day.",
    crowdReasonZh: "一早就開始排隊了。今天每家店都很忙。",
    observation: "夕方以降、持ち歩く人をよく見かける。",
    observationEn: "Since evening, people carrying these cups everywhere.",
    observationZh: "傍晚後，隨處可見有人端著這個走。",
    rating: 4.5,
    crowdNote: "今日は全国的に混んでいる",
    crowdNoteEn: "Busy everywhere in Japan today",
    crowdNoteZh: "今天全日本都在排",
    recentBuzz: "SNS でトレンド入り",
    recentBuzzEn: "Trending on Japanese social media",
    recentBuzzZh: "在社群媒體上快速爆紅",
    timeOpen: 7,
    timeClose: 22,
    periodBoost: ["morning", "daytime", "evening"],
  },

  // ── ファミリーマート 新商品 ───────────────────────────────────────────────
  {
    id: "familymart-new-item",
    venueName: "ファミリーマート",
    venueNameEn: "FamilyMart",
    venueNameZh: "FamilyMart",
    neighborhood: "どこでも",
    neighborhoodEn: "Everywhere",
    station: "",
    stationEn: "",
    walkMinutes: 0,
    address: "全国のファミリーマート",
    addressEn: "FamilyMart stores nationwide",
    coords: [35.6762, 139.6503],
    type: "convenience",
    limitedItem: "四国の塩と柚子のフロマージュブランケーキ（今週限定）。",
    limitedItemEn: "Shikoku Salt & Yuzu Fromage Blanc Cake (this week only).",
    limitedItemZh: "四國鹽與柚子白起司蛋糕（本週限定）。",
    crowdReason: "今週ファミマに行った人の多くが持っていたもの。",
    crowdReasonEn: "What most people buying something at Famima were carrying this week.",
    crowdReasonZh: "本週去 FamilyMart 的人幾乎都買了這個。",
    observation: "今週いちばんの小さな話題。",
    observationEn: "This week's small thing everyone's talking about.",
    observationZh: "本週最小卻最多人說的事。",
    rating: 4.4,
    timeOpen: 0,
    timeClose: 0,
  },
];

// ── Locale helpers ────────────────────────────────────────────────────────────

export type LocaleGroup = "ja" | "zh" | "en";

export function getLocaleGroup(locale: string): LocaleGroup {
  if (locale === "ja") return "ja";
  if (locale === "zh-TW" || locale === "zh-CN") return "zh";
  return "en";
}

export function getSignalVenueName(s: TonightSignal, g: LocaleGroup): string {
  if (g === "ja") return s.venueName;
  if (g === "zh") return s.venueNameZh ?? s.venueName;
  return s.venueNameEn;
}

export function getSignalNeighborhood(s: TonightSignal, g: LocaleGroup): string {
  return g === "ja" ? s.neighborhood : s.neighborhoodEn;
}

export function getSignalObservation(s: TonightSignal, g: LocaleGroup): string {
  if (g === "ja") return s.observation;
  if (g === "zh") return s.observationZh ?? s.observationEn;
  return s.observationEn;
}

export function getSignalCrowdReason(s: TonightSignal, g: LocaleGroup): string | undefined {
  if (g === "ja") return s.crowdReason;
  if (g === "zh") return s.crowdReasonZh ?? s.crowdReasonEn;
  return s.crowdReasonEn;
}

export function getSignalLimitedItem(s: TonightSignal, g: LocaleGroup): string | undefined {
  if (g === "ja") return s.limitedItem;
  if (g === "zh") return s.limitedItemZh ?? s.limitedItemEn;
  return s.limitedItemEn;
}

export function getSignalCrowdNote(s: TonightSignal, g: LocaleGroup): string | undefined {
  if (g === "ja") return s.crowdNote;
  if (g === "zh") return s.crowdNoteZh ?? s.crowdNoteEn;
  return s.crowdNoteEn;
}

export function getSignalRecentBuzz(s: TonightSignal, g: LocaleGroup): string | undefined {
  if (g === "ja") return s.recentBuzz;
  if (g === "zh") return s.recentBuzzZh ?? s.recentBuzzEn;
  return s.recentBuzzEn;
}

export function getSignalStationLine(s: TonightSignal, g: LocaleGroup): string | null {
  if (s.walkMinutes === 0) return null;
  if (g === "ja") return `${s.station}駅 徒歩 ${s.walkMinutes} 分`;
  if (g === "zh") return `${s.station}站步行 ${s.walkMinutes} 分鐘`;
  return `${s.stationEn} · ${s.walkMinutes} min walk`;
}

export function getSignalMapsUrl(s: TonightSignal): string {
  return `https://www.google.com/maps/search/?api=1&query=${s.coords[0]},${s.coords[1]}`;
}

// ── Seeded PRNG ───────────────────────────────────────────────────────────────

function seededRng(seed: number): () => number {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Pulse window ──────────────────────────────────────────────────────────────

/** Tokyo hour (0–23) at which the current pulse window started. */
export function getPulseHour(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / (3600 * 1000)) % 24;
}

// ── Active check ──────────────────────────────────────────────────────────────

function isSignalActive(s: TonightSignal, hour: number): boolean {
  if (s.timeOpen === 0 && s.timeClose === 0) return true;

  const { timeOpen, timeClose } = s;
  if (timeOpen <= timeClose) {
    if (hour >= timeOpen && hour < timeClose) return true;
  } else {
    if (hour >= timeOpen || hour < timeClose) return true;
  }

  const hoursUntilOpen = (timeOpen - hour + 24) % 24;
  if (hoursUntilOpen > 0 && hoursUntilOpen <= 3) return true;

  return false;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreSignal(
  s: TonightSignal,
  condition: string,
  period: string,
  dayType: DayType,
): number {
  let score = 0;
  if (s.weatherBoost?.includes(condition as WeatherCondition)) score += 2;
  if (s.periodBoost?.includes(period as Period)) score += 2;
  if (s.dayBoost?.includes(dayType)) score += 2;
  return score;
}

function getShowProbability(period: string): number {
  switch (period) {
    case "latenight": return 0.85;
    case "night":     return 0.80;
    case "evening":   return 0.72;
    case "sunset":    return 0.60;
    case "daytime":   return 0.45;
    case "morning":   return 0.28;
    case "dawn":      return 0.12;
    default:          return 0.50;
  }
}

// ── Public: ONE signal or null ────────────────────────────────────────────────

export function getTonightSignal(
  hour: number,
  condition: string,
  period: string,
  dayType: DayType,
): TonightSignal | null {
  if (hour >= 1 && hour < 9) return null;

  const active = ALL_SIGNALS.filter((s) => isSignalActive(s, hour));
  if (active.length === 0) return null;

  const hourlySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (3600 * 1000));
  const rng = seededRng(hourlySeed);

  if (rng() > getShowProbability(period)) return null;

  const scored = active.map((s) => ({
    s,
    score: scoreSignal(s, condition, period, dayType) + rng() * 0.9,
  }));
  scored.sort((a, b) => b.score - a.score);

  const topN = Math.min(3, scored.length);
  return scored[Math.floor(rng() * topN)].s;
}

// Kept for backward compatibility
export function getTonightSignals(
  hour: number,
  condition: string,
  period: string,
  dayType: DayType,
): TonightSignal[] {
  const single = getTonightSignal(hour, condition, period, dayType);
  return single ? [single] : [];
}
