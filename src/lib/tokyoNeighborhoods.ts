// Neighborhood layer — living Tokyo, not tourist Tokyo.
// Surfaces 2 neighborhoods per night with a condition-aware reason why.

import type { BehaviorProfile } from "./tokyoMemory";
import type { TokyoChapter } from "./tokyoRelationship";

const CHAPTER_ORDER: TokyoChapter[] = ["arriving", "adjusting", "feeling", "belonging", "home"];

function chapterIndex(ch: TokyoChapter): number {
  return CHAPTER_ORDER.indexOf(ch);
}

function seededRng(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface NeighborhoodSignal {
  conditions?: {
    periods?: string[];
    weather?: string[];
    dayTypes?: string[];
  };
  en: string;
  ja: string;
  zh: string;
}

export interface TokyoNeighborhood {
  id: string;
  nameEn: string;
  nameJa: string;
  nameZh: string;

  // Short — for homepage widget
  characterEn: string;
  characterJa: string;
  characterZh: string;

  // Expanded — for detail page
  longCharacterEn: string;
  longCharacterJa: string;
  longCharacterZh: string;

  // Three life observations — what actually happens here
  moments: { en: string; ja: string; zh: string }[];

  // Photo
  imageUrl: string;
  imageFilter: string;

  // Condition-specific "why tonight" signals
  signals: NeighborhoodSignal[];

  // Fallback signal when no condition matches
  defaultEn: string;
  defaultJa: string;
  defaultZh: string;

  // When this neighborhood is most alive
  conditions: {
    periods?: string[];
    weather?: string[];
    dayTypes?: string[];
  };

  weight: number;
  minChapter?: TokyoChapter;
}

const ALL_NEIGHBORHOODS: TokyoNeighborhood[] = [
  // ── Nakameguro ────────────────────────────────────────────────────────────
  {
    id: "nakameguro",
    nameEn: "Nakameguro",
    nameJa: "中目黒",
    nameZh: "中目黑",
    characterEn: "A river runs through it. The city organized itself around the water, which is why this place feels different from anywhere else.",
    characterJa: "川が流れている。街が水を中心に組み立てられている。だから、ここは他の場所とは違う感じがする。",
    characterZh: "有條河流過。城市圍繞著水建立起來，這就是為什麼這個地方和其他任何地方感覺都不同。",
    longCharacterEn: "The Meguro River is the neighborhood's organizing principle. Everything bends toward it — the cafés and bars arrange their best seats to face the water, the walking paths run alongside it, the cherry trees line its banks each spring. When it rains, the sound changes. People who live here know to go out rather than stay in when the weather turns.",
    longCharacterJa: "目黒川がこの街の中心にある。すべてが川に向かって配置されている。カフェもバーも、水に面した席を一番いい場所に置いている。春になると桜が川沿いに並ぶ。雨が降ると、音が変わる。ここに住んでいる人たちは、雨になったら家にいるよりも外に出るべきだと知っている。",
    longCharacterZh: "目黑川是這個街區的組織原則。一切都朝向河流傾斜——咖啡館和酒吧把最好的座位安排在朝向河水的方向，步行小徑沿河而行，春天時櫻樹排列在河岸兩側。下雨時，聲音會改變。住在這裡的人知道，天氣轉變時應該出去，而不是待在家裡。",
    moments: [
      {
        en: "You find a bar that faces the river and stay two hours longer than you planned.",
        ja: "川に面したバーを見つけて、予定より二時間長くいる。",
        zh: "你找到一家面向河流的酒吧，待的時間比預計多了兩個小時。",
      },
      {
        en: "In cherry blossom season, the riverbank becomes the city's living room.",
        ja: "桜の季節、川沿いは街のリビングルームになる。",
        zh: "櫻花季節，河岸成為整個城市的客廳。",
      },
      {
        en: "After 9pm on weekdays, the path along the water is quiet enough to hear the current.",
        ja: "平日の夜九時を過ぎると、川沿いの道は水の流れが聞こえるほど静かになる。",
        zh: "平日晚上九點後，沿水的小路安靜得能聽見水流聲。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=75",
    imageFilter: "saturate(0.48) brightness(0.38) contrast(1.08)",
    signals: [
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Rainy nights, this river is better than anywhere.",
        ja: "雨の夜は、ここの川が一番いい。",
        zh: "雨夜，這裡的河流是最好的。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "The after-work crowd makes the riverside theirs.",
        ja: "仕事終わりの人たちが、川沿いを自分たちのものにしている。",
        zh: "下班後的人群把河邊變成了自己的地方。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["evening", "night"] },
        en: "Weekend evening. People gather at the river without meaning to.",
        ja: "週末の夜。意図せず、川に人が集まってくる。",
        zh: "週末夜晚。人們不知不覺地聚集在河邊。",
      },
      {
        conditions: { periods: ["night", "latenight"], weather: ["clear", "cloudy"] },
        en: "The canal lights at night.",
        ja: "夜の川沿いの光。",
        zh: "夜晚河邊的燈光。",
      },
    ],
    defaultEn: "The river is there whenever you need it.",
    defaultJa: "川はいつでもそこにある。",
    defaultZh: "河流永遠在那裡。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 2,
  },

  // ── Daikanyama ────────────────────────────────────────────────────────────
  {
    id: "daikanyama",
    nameEn: "Daikanyama",
    nameJa: "代官山",
    nameZh: "代官山",
    characterEn: "Quiet and designed without being cold. The streets here make you slow down before you decide to.",
    characterJa: "静かで、でも冷たくはない。ここの道は、気づく前に足を遅くさせる。",
    characterZh: "安靜而有設計感，但不顯冷漠。這裡的街道讓你不自覺地放慢腳步。",
    longCharacterEn: "Daikanyama was built for walking at a particular speed. The boutiques and cafés are spaced in a way that rewards slowing down — there is always one more shop worth looking at on the next corner. The residential streets behind the main strip are quiet enough to hear your footsteps. Tsutaya Books stays open late, has chairs, and no one expects you to leave.",
    longCharacterJa: "代官山は、特定のペースで歩くために作られたような街だ。ブティックやカフェは、立ち止まることを促すような間隔で並んでいる。次の角にも、もう一つ見る価値のある店がある。メインの商業通りの裏にある住宅街は、自分の足音が聞こえるほど静かだ。蔦屋書店は遅くまで開いていて、椅子があって、誰も出て行くことを期待しない。",
    longCharacterZh: "代官山的建造似乎就是為了以特定的速度行走。精品店和咖啡館的間距讓人自然地放慢腳步——下一個轉角總還有一家值得看的店。主要商業街後面的住宅小路安靜得能聽見自己的腳步聲。蔦屋書店開到很晚，有椅子，沒有人期望你離開。",
    moments: [
      {
        en: "You end up buying a book in Japanese you can barely read.",
        ja: "ほとんど読めない日本語の本を買ってしまう。",
        zh: "你最後買了一本幾乎讀不懂的日文書。",
      },
      {
        en: "The coffee shop that closes at nine is the one to go to at eight.",
        ja: "九時に閉まる喫茶店は、八時に行くべき場所だ。",
        zh: "九點關門的咖啡館，是八點去的最佳選擇。",
      },
      {
        en: "The residential side streets, not the main road, are the neighborhood.",
        ja: "この街の本質は、メインロードではなく、住宅地の脇道にある。",
        zh: "這個街區的真實，在住宅區的小路，不在主幹道上。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=75",
    imageFilter: "saturate(0.44) brightness(0.40) contrast(1.06)",
    signals: [
      {
        conditions: { periods: ["evening"], weather: ["clear", "cloudy"] },
        en: "The street air in Daikanyama changes around sunset.",
        ja: "夕方になると、代官山の空気が変わる。",
        zh: "傍晚時分，代官山的空氣改變了。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Shop lights in the wet streets. Daikanyama handles rain well.",
        ja: "濡れた道に店の灯り。代官山は雨が似合う。",
        zh: "潮濕街道上的店面燈光。代官山很適合雨天。",
      },
      {
        conditions: { periods: ["night"], weather: ["clear"] },
        en: "Quiet and lit at night. The kind of walking that doesn't need a reason.",
        ja: "夜は静かで、灯りがある。理由のいらない散歩。",
        zh: "夜晚安靜而明亮。不需要理由的那種散步。",
      },
      {
        conditions: { dayTypes: ["sunday"], periods: ["afternoon"] },
        en: "Sunday afternoon. Daikanyama at its most unhurried.",
        ja: "日曜の午後。一番ゆっくりした代官山。",
        zh: "週日下午。代官山最不匆忙的時刻。",
      },
    ],
    defaultEn: "For when you want Tokyo elegant and unhurried.",
    defaultJa: "上品でゆっくりした東京を求めるときに。",
    defaultZh: "當你想要優雅從容的東京時。",
    conditions: { periods: ["evening", "night"] },
    weight: 2,
  },

  // ── Shimokitazawa ─────────────────────────────────────────────────────────
  {
    id: "shimokitazawa",
    nameEn: "Shimokitazawa",
    nameJa: "下北沢",
    nameZh: "下北澤",
    characterEn: "Music venues, vintage shops, thirty-year-old coffee shops. The part of Tokyo that still does what it wants.",
    characterJa: "ライブハウス、古着屋、三十年続く喫茶店。東京の中で、今もやりたいことをやっている場所。",
    characterZh: "音樂場所、古著店、開了三十年的咖啡館。東京中仍在做自己想做的事情的地方。",
    longCharacterEn: "Shimokitazawa has no sensible street grid. The lanes overlap and dead-end and branch unexpectedly, as if the neighborhood grew without any plan — which it basically did. The music venues are inside buildings that look like they're about to close; the vintage shops have owners who know exactly what they have. This is the part of Tokyo that was never gentrified because it never attracted that kind of attention.",
    longCharacterJa: "下北沢には、整然とした街路がない。路地は重なり合い、行き止まりになり、予想もしない方向に分岐する。まるで計画なしに育ったようで、実際そうだった。ライブハウスは今にも閉まりそうな建物の中にある。古着屋の店主たちは、自分たちが何を持っているかを正確に知っている。これは、その種の注目を集めなかったがゆえに、ジェントリフィケーションされなかった東京だ。",
    longCharacterZh: "下北澤沒有合理的街道規劃。小巷重疊、死路、出乎意料地分叉，彷彿整個街區在毫無計劃的情況下生長——事實上也確實如此。音樂場所藏在看起來快要關門的建築裡；古著店的老闆清楚地知道自己手上有什麼。這是東京從未被仕紳化的地方，因為它從未吸引那種注意。",
    moments: [
      {
        en: "You see a show and walk out into a street you haven't seen yet.",
        ja: "ライブを観て外に出ると、まだ見ていない道に出る。",
        zh: "看完演出走出來，來到一條還沒見過的街道。",
      },
      {
        en: "At 11pm in a tiny coffee shop, two people are reading and the music is too soft to name.",
        ja: "夜の十一時、小さな喫茶店で、二人が本を読んでいる。音楽は名前のつけられないほど小さい。",
        zh: "夜晚十一點，在一間小咖啡館裡，有兩個人在看書，音樂輕得讓人說不出名字。",
      },
      {
        en: "The record you weren't looking for is the one you find.",
        ja: "探していなかったレコードを、見つける。",
        zh: "你找到的，是那張你沒有在找的唱片。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=75",
    imageFilter: "saturate(0.42) brightness(0.35) contrast(1.10) hue-rotate(8deg)",
    signals: [
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["night", "latenight"] },
        en: "Weekend night. Shimokitazawa is doing its thing.",
        ja: "週末の夜。下北沢は下北沢をやっている。",
        zh: "週末夜晚。下北澤正在做它自己的事。",
      },
      {
        conditions: { weather: ["rainy", "foggy"], periods: ["night", "latenight"] },
        en: "Even in the rain, this neighborhood doesn't stop.",
        ja: "雨でも、ここは止まらない。",
        zh: "即使下雨，這個街區也不停歇。",
      },
      {
        conditions: { periods: ["latenight"] },
        en: "Still going. It always ends later here.",
        ja: "まだ続いている。いつもここは遅く終わる。",
        zh: "還在繼續。這裡總是結束得更晚。",
      },
      {
        conditions: { dayTypes: ["saturday", "sunday"], periods: ["afternoon"] },
        en: "Afternoon. Vintage shops and records and no rush.",
        ja: "午後。古着とレコードと、急がなくていい時間。",
        zh: "下午。古著、黑膠唱片，還有不用趕的時光。",
      },
    ],
    defaultEn: "Something is always happening.",
    defaultJa: "いつも何かやっている。",
    defaultZh: "總是有什麼事情在發生。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 2,
  },

  // ── Aoyama ────────────────────────────────────────────────────────────────
  {
    id: "aoyama",
    nameEn: "Aoyama",
    nameJa: "青山",
    nameZh: "青山",
    characterEn: "Select shops, small galleries, coffee that takes itself seriously. The version of Tokyo that grew up.",
    characterJa: "セレクトショップ、小さなギャラリー、本格的なコーヒー。大人になった東京。",
    characterZh: "精選店鋪、小型畫廊、認真對待咖啡的地方。長大了的東京。",
    longCharacterEn: "Aoyama is what Tokyo looks like when it's done with trying. The shops are selected rather than accumulated; the galleries run without fanfare. The coffee is excellent and the staff don't explain it to you. On weekday evenings after the offices empty, the lanes between the buildings are quiet enough that you can take your time with them.",
    longCharacterJa: "青山は、東京が頑張るのをやめた後の姿だ。店は集積ではなく、選択の結果として並んでいる。ギャラリーは静かに営業している。コーヒーは本物で、スタッフが説明しない。平日の夕方、オフィスが空になると、建物の間の路地は、ゆっくり歩ける静けさになる。",
    longCharacterZh: "青山是東京不再努力表現之後的樣子。店鋪是精選的結果，不是積累的；畫廊安靜地運作，不加張揚。咖啡很出色，工作人員不會向你解釋它。平日傍晚，辦公室清空之後，建築之間的小巷安靜得讓你可以慢慢走。",
    moments: [
      {
        en: "A gallery you find by accident has three works that stay with you.",
        ja: "偶然見つけたギャラリーに、心に残る作品が三つある。",
        zh: "偶然發現的畫廊裡，有三件作品讓你難忘。",
      },
      {
        en: "The coffee doesn't come with a story. It just comes.",
        ja: "コーヒーは説明付きで来ない。ただ来る。",
        zh: "咖啡不帶解說，就這樣送上來。",
      },
      {
        en: "The lane behind the main road is better than the main road.",
        ja: "メインロードの裏の路地は、メインロードよりいい。",
        zh: "主幹道後面的小巷比主幹道更好。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=75",
    imageFilter: "saturate(0.38) brightness(0.42) contrast(1.07)",
    signals: [
      {
        conditions: { periods: ["afternoon"], weather: ["clear", "cloudy"] },
        en: "Afternoon Aoyama. The lanes are quiet and worth walking.",
        ja: "青山の午後。路地が静かで、歩く価値がある。",
        zh: "青山的下午。小巷安靜，值得走走。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "After the rush, this neighborhood belongs to fewer people.",
        ja: "ラッシュが終わると、少ない人のための街になる。",
        zh: "高峰期過後，這個街區屬於較少的人。",
      },
      {
        conditions: { periods: ["evening"], weather: ["clear"] },
        en: "The shopfronts at evening. Elegant, unhurried.",
        ja: "夕方の店の前。上品で、急いでいない。",
        zh: "傍晚的店面。優雅，從容。",
      },
    ],
    defaultEn: "The grown-up side of Tokyo.",
    defaultJa: "大人の東京。",
    defaultZh: "東京成熟的一面。",
    conditions: { periods: ["afternoon", "evening"] },
    weight: 1,
  },

  // ── Nishi-Ogikubo ─────────────────────────────────────────────────────────
  {
    id: "nishi-ogikubo",
    nameEn: "Nishi-Ogikubo",
    nameJa: "西荻窪",
    nameZh: "西荻窪",
    characterEn: "Old bookshops, old kissaten, old residents. A neighborhood that exists for the people living in it, not for visitors.",
    characterJa: "古書店、古い喫茶店、古くからの住民。訪れる人のためではなく、住む人のために存在している街。",
    characterZh: "舊書店、老喫茶店、老居民。一個為居住者而存在的街區，不是為了遊客。",
    longCharacterEn: "Nishi-Ogikubo runs on its own schedule. The used bookshops open when they want to and close before you expected. The kissaten are unchanged from decades ago — same furniture, same record collections, same owners. This is a neighborhood that has no particular ambition to become something else, which is what makes it valuable.",
    longCharacterJa: "西荻窪は自分のスケジュールで動いている。古書店は好きな時間に開いて、予想より早く閉まる。喫茶店は数十年前と変わっていない——同じ家具、同じレコードのコレクション、同じ店主。これは、別の何かになろうという野心を持たない街だ。だから価値がある。",
    longCharacterZh: "西荻窪按自己的時間表運轉。舊書店在它想開門的時候開，比你預期早關門。喫茶店幾十年來沒有改變——同樣的家具、同樣的黑膠唱片收藏、同樣的老闆。這是一個沒有野心想變成別的什麼的街區，這正是它珍貴的地方。",
    moments: [
      {
        en: "You spend an hour with books you can't read and buy two anyway.",
        ja: "読めない本と一時間過ごし、それでも二冊買う。",
        zh: "花一個小時看看不懂的書，然後還是買了兩本。",
      },
      {
        en: "Rain, a window seat, and a coffee that comes in the kind of cup they stopped making.",
        ja: "雨、窓際の席、もう作られていない種類のカップで来るコーヒー。",
        zh: "雨、靠窗的座位，和用那種早已停產的杯子端上來的咖啡。",
      },
      {
        en: "The antique shop owner doesn't try to sell to you. You end up buying something.",
        ja: "アンティークショップの主人は、売ろうとしない。それでも何かを買ってしまう。",
        zh: "古董店的老闆不試著向你推銷，你卻還是買了什麼。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=75",
    imageFilter: "saturate(0.50) brightness(0.36) contrast(1.05) sepia(0.12)",
    signals: [
      {
        conditions: { dayTypes: ["saturday", "sunday"], periods: ["afternoon"] },
        en: "Weekend afternoon. The right time for the old bookshops.",
        ja: "週末の午後。古書店のための時間。",
        zh: "週末下午。舊書店的最佳時機。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Rain. A kissaten window. An afternoon in Nishi-Ogikubo.",
        ja: "雨。喫茶店の窓。西荻窪の午後。",
        zh: "下雨。喫茶店的窗邊。西荻窪的午後。",
      },
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "Weekday evening. The neighborhood belongs to itself.",
        ja: "平日の夕方。街が自分のものになる時間。",
        zh: "平日傍晚。街區回歸自己的狀態。",
      },
    ],
    defaultEn: "The Tokyo that wasn't designed to be visited.",
    defaultJa: "観光用に設計されていない東京。",
    defaultZh: "不是為了被參觀而設計的東京。",
    conditions: { periods: ["afternoon", "evening"] },
    weight: 1,
  },

  // ── Kagurazaka ────────────────────────────────────────────────────────────
  {
    id: "kagurazaka",
    nameEn: "Kagurazaka",
    nameJa: "神楽坂",
    nameZh: "神樂坂",
    characterEn: "Cobblestone alleys, French influence, hidden restaurants from another era. A neighborhood that kept its history.",
    characterJa: "石畳の路地、フランスの影響、別の時代からの隠れた料理屋。歴史を保ち続けた街。",
    characterZh: "鵝卵石小巷、法式影響、來自另一個時代的隱藏餐廳。一個保留了歷史的街區。",
    longCharacterEn: "Kagurazaka has been through enough histories to become layered. There was a geisha district here once, then a French community settled nearby, and the neighborhood absorbed both without collapsing into either. The cobblestone alleys branch off the main road into something you didn't expect — a Japanese restaurant hidden between two stone walls, a café with no English sign. Rain makes the stone paths reflective and changes the mood of the whole place.",
    longCharacterJa: "神楽坂は、複数の歴史を経て、重なりを持つようになった。かつてここには花街があり、その後フランス人コミュニティが近くに定着し、街はどちらにも崩れることなく両方を吸収した。メインロードから石畳の路地に入ると、予想していなかったものがある——石垣の間に隠れた料理屋、英語の看板のないカフェ。雨が降ると、石畳の道が光を反射し、街の雰囲気が変わる。",
    longCharacterZh: "神樂坂經歷了足夠多的歷史，因而變得有層次。這裡曾經有花街，後來法國社區在附近定居，街區吸收了兩者而沒有崩塌成其中任何一個。從主幹道走進鵝卵石小巷，你會遇見意想不到的東西——夾在兩道石牆之間的隱藏料理屋，沒有英文招牌的咖啡館。下雨時，石板路反射光線，整個地方的氣氛為之一變。",
    moments: [
      {
        en: "You find a restaurant through a door that doesn't look like a restaurant.",
        ja: "料理屋に見えないドアから入って、料理屋を見つける。",
        zh: "你從一扇不像餐廳入口的門走進去，找到了一家餐廳。",
      },
      {
        en: "The alley where you expect an exit leads to another alley.",
        ja: "出口だと思った路地が、また別の路地につながっている。",
        zh: "你以為是出口的小巷，通向另一條小巷。",
      },
      {
        en: "Rainy evening. The stone path is yours.",
        ja: "雨の夕方。石畳の道は自分のものだ。",
        zh: "雨天傍晚。石板路是你一個人的。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75",
    imageFilter: "saturate(0.38) brightness(0.32) contrast(1.12) sepia(0.10)",
    signals: [
      {
        conditions: { weather: ["rainy", "foggy"], periods: ["evening", "night"] },
        en: "Rain on the stone alleys. Kagurazaka is what it really is tonight.",
        ja: "石畳に雨が降る。今夜の神楽坂は本当の姿をしている。",
        zh: "雨落在石板小巷上。今晚的神樂坂才是它真正的樣子。",
      },
      {
        conditions: { periods: ["evening"] },
        en: "The hidden restaurants are filling. The alleys quiet down.",
        ja: "隠れた料理屋に人が集まり始める。路地が静かになる。",
        zh: "隱藏的餐廳開始有人了。小巷靜下來。",
      },
      {
        conditions: { periods: ["night"] },
        en: "After dark, the stone paths feel like somewhere else.",
        ja: "暗くなると、石畳の道はどこか別の場所になる。",
        zh: "天黑後，石板路感覺像另一個地方。",
      },
    ],
    defaultEn: "A neighborhood with a past.",
    defaultJa: "過去を持つ街。",
    defaultZh: "一個有過去的街區。",
    conditions: { periods: ["evening", "night"], weather: ["rainy", "foggy"] },
    weight: 2,
  },

  // ── Koenji ────────────────────────────────────────────────────────────────
  {
    id: "koenji",
    nameEn: "Koenji",
    nameJa: "高円寺",
    nameZh: "高円寺",
    characterEn: "Eclectic, unpredictable, completely itself. Tokyo without pretension.",
    characterJa: "折衷的で、予測できなくて、完全に自分らしい。気取りのない東京。",
    characterZh: "折衷、難以預測、完全做自己。不裝模作樣的東京。",
    longCharacterEn: "Koenji has always absorbed people who didn't fit anywhere else. Musicians who couldn't afford Shimokitazawa, artists who preferred the Chuo Line, people who liked the density without the gloss. The result is something fully its own — not trying to be a destination, just existing at full volume. The covered shopping streets protect it from weather and from any pressure to become more presentable.",
    longCharacterJa: "高円寺はいつも、他のどこにも合わなかった人たちを受け入れてきた。下北沢に住む余裕がなかったミュージシャン、中央線を好むアーティスト、輝かしくない密度を好む人たち。その結果、完全に独自のものができた——目的地になろうとはしていない、ただフルボリュームで存在している。屋根付きの商店街は、天気からも、もっと見栄えよくなるべきというプレッシャーからも、街を守っている。",
    longCharacterZh: "高円寺一直是那個接納不屬於任何其他地方的人的街區。負擔不起下北澤的音樂人，偏好中央線的藝術家，喜歡那種不加修飾的密集感的人。結果形成了某種完全屬於自己的東西——不試圖成為目的地，只是以全音量存在著。有頂棚的商店街保護著它免受天氣的侵擾，也免受變得更像樣的壓力。",
    moments: [
      {
        en: "You wander into a small live venue that holds maybe forty people.",
        ja: "四十人も入れないような小さなライブハウスに迷い込む。",
        zh: "你誤走進一個大概只能容納四十人的小型演出場地。",
      },
      {
        en: "The second-hand record shop has a listening station you use for forty minutes.",
        ja: "中古レコード屋に試聴ステーションがある。四十分使う。",
        zh: "二手唱片店有一個試聽站，你用了四十分鐘。",
      },
      {
        en: "Something about this neighborhood makes you feel like you don't have to explain yourself.",
        ja: "この街には何か、自分を説明しなくていい気持ちにさせるものがある。",
        zh: "這個街區有某種東西，讓你感覺不需要解釋自己。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&q=75",
    imageFilter: "saturate(0.45) brightness(0.36) contrast(1.08) hue-rotate(5deg)",
    signals: [
      {
        conditions: { periods: ["night", "latenight"] },
        en: "Something is always happening in Koenji at night.",
        ja: "夜の高円寺は、いつも何かやっている。",
        zh: "高円寺的夜晚，總是有些什麼在發生。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"] },
        en: "Weekend nights here are their own thing.",
        ja: "ここの週末の夜は、独自のものだ。",
        zh: "這裡的週末夜晚是自成一格的。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "Koenji stays open. The covered shopping street.",
        ja: "高円寺は開いている。屋根付きの商店街。",
        zh: "高円寺不關門。有屋頂的商店街。",
      },
    ],
    defaultEn: "Fully, reliably itself.",
    defaultJa: "完全に、ずっと、自分らしい。",
    defaultZh: "完全地，始終如一地做自己。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 1,
  },

  // ── Kiyosumi-Shirakawa ────────────────────────────────────────────────────
  {
    id: "kiyosumi-shirakawa",
    nameEn: "Kiyosumi-Shirakawa",
    nameJa: "清澄白河",
    nameZh: "清澄白河",
    characterEn: "Roasters, small galleries, the river close. People built a neighborhood around good coffee, and it worked.",
    characterJa: "焙煎所、小さなギャラリー、近くに川。いいコーヒーを中心に、街が作られた。そしてそれは機能した。",
    characterZh: "烘焙坊、小型畫廊、河流就在附近。人們圍繞著好咖啡建立了一個街區，而這竟然成功了。",
    longCharacterEn: "Kiyosumi-Shirakawa became what it is because serious coffee people moved in. The old printing factory buildings and warehouses were the right size for roasters who wanted to do things properly. A neighborhood built around one thing done very well has a kind of coherence that most places lack. People come from across the city for coffee and stay for the river and the pace — which is different from almost everywhere else in Tokyo.",
    longCharacterJa: "清澄白河は、本格的なコーヒーの人たちが移り住んできたことで、今の姿になった。古い印刷工場や倉庫は、ちゃんとやりたい焙煎人にとってちょうどいい大きさだった。一つのことをとてもよくやることを中心に作られた街には、ほとんどの場所には欠けている独特のまとまりがある。人々は街全体からコーヒーのために来て、川とそのペースのために滞在する——東京の他のほとんどの場所とは異なるペース。",
    longCharacterZh: "清澄白河之所以成為今天這個樣子，是因為認真對待咖啡的人搬來了。舊印刷廠房和倉庫對於想把事情做好的烘焙師來說大小正好。一個圍繞著一件做得非常好的事情所建立的街區，有一種大多數地方所缺乏的獨特連貫性。人們從全城各地為咖啡而來，然後因為河流和節奏而留下——那種節奏與東京其他幾乎所有地方都不同。",
    moments: [
      {
        en: "The first coffee of the day, in a room that smells of roasting.",
        ja: "焙煎の香りがする部屋で、その日最初のコーヒーを飲む。",
        zh: "在瀰漫著烘焙香氣的房間裡，喝這一天的第一杯咖啡。",
      },
      {
        en: "You cross the bridge over the river twice without meaning to.",
        ja: "気づかないうちに、川にかかる橋を二回渡っている。",
        zh: "你不知不覺地過了兩次河上的橋。",
      },
      {
        en: "The pace here is different. You notice it only when you leave.",
        ja: "ここのペースは違う。それに気づくのは、離れた後だ。",
        zh: "這裡的節奏不同。你只有在離開後才意識到這一點。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=75",
    imageFilter: "saturate(0.40) brightness(0.40) contrast(1.06)",
    signals: [
      {
        conditions: { periods: ["morning", "earlyMorning"] },
        en: "The coffee is ready. The neighborhood is just starting.",
        ja: "コーヒーが準備できている。街が動き始めた。",
        zh: "咖啡準備好了。街區才剛開始醒來。",
      },
      {
        conditions: { periods: ["afternoon"], weather: ["clear", "cloudy"] },
        en: "Afternoon between the roasters. Good air for walking.",
        ja: "焙煎所の間の午後。歩くのにいい空気。",
        zh: "在各烘焙坊之間的下午。適合步行的好空氣。",
      },
      {
        conditions: { dayTypes: ["saturday", "sunday"] },
        en: "Weekend in Kiyosumi. The pace is different here.",
        ja: "清澄白河の週末。ここのペースは違う。",
        zh: "清澄白河的週末。這裡的節奏不同。",
      },
    ],
    defaultEn: "Coffee and the river.",
    defaultJa: "コーヒーと川。",
    defaultZh: "咖啡和河流。",
    conditions: { periods: ["morning", "earlyMorning", "afternoon"] },
    weight: 1,
  },

  // ── Yanaka ────────────────────────────────────────────────────────────────
  {
    id: "yanaka",
    nameEn: "Yanaka",
    nameJa: "谷中",
    nameZh: "谷中",
    characterEn: "The old shitamachi that didn't get knocked down. Temple paths, narrow shotengai, cats. Tokyo before everything changed.",
    characterJa: "取り壊されなかった古い下町。寺の道、細い商店街、猫。何もかもが変わる前の東京。",
    characterZh: "沒有被拆掉的老下町。寺廟小徑、狹窄商店街、貓。一切改變之前的東京。",
    longCharacterEn: "Yanaka is a working demonstration that not everything in Tokyo got torn down and rebuilt. The narrow streets follow the contours of the hill they were built on, rather than any grid. The cemetery at the center is not gloomy but shaded — a place people walk through on the way somewhere else. Cats appear on walls and in passageways with the confidence of residents who have lived here longer than anyone.",
    longCharacterJa: "谷中は、東京のすべてが取り壊されて再建されたわけではないということを、実証している。ここの細い道は、どんなグリッドにも従わず、建てられた丘の輪郭に沿っている。中心にある墓地は暗くはなく、木陰になっている——他の場所へ行く途中に人が通り抜ける場所だ。猫は壁の上や路地に、誰よりも長くここに住んでいる住民の自信とともに現れる。",
    longCharacterZh: "谷中是一個活生生的示範：東京並非所有的東西都被拆掉重建了。這裡的狹窄街道沿著建造它們的山丘輪廓延伸，而不是遵循任何網格。中心的墓地並不陰沉，而是有樹蔭——一個人們在去別的地方途中穿行的地方。貓出現在牆上和小路裡，帶著比任何人都在這裡住得更久的居民的自信。",
    moments: [
      {
        en: "You get lost in fifteen minutes and find somewhere better than where you were going.",
        ja: "十五分で迷子になって、向かっていた場所よりいいところを見つける。",
        zh: "十五分鐘後你迷路了，然後找到了比原本目的地更好的地方。",
      },
      {
        en: "The shotengai on a slow weekend. You buy something you didn't need.",
        ja: "ゆっくりした週末の商店街。必要ではなかったものを買う。",
        zh: "悠閒週末的商店街。你買了一件不需要的東西。",
      },
      {
        en: "The morning here sounds different — birds, not trains.",
        ja: "ここの朝は音が違う——電車ではなく、鳥の声。",
        zh: "這裡的早晨聲音不同——是鳥聲，不是列車聲。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=75",
    imageFilter: "saturate(0.50) brightness(0.38) contrast(1.04) sepia(0.14)",
    signals: [
      {
        conditions: { periods: ["morning", "earlyMorning"], weather: ["clear", "cloudy"] },
        en: "Clear morning. Yanaka is the closest thing to old Tokyo.",
        ja: "晴れた朝。谷中は、古い東京に一番近い場所。",
        zh: "晴朗的早晨。谷中是最接近舊東京的地方。",
      },
      {
        conditions: { periods: ["afternoon"], dayTypes: ["saturday", "sunday"] },
        en: "The shopping street on a slow afternoon.",
        ja: "ゆっくりした午後の商店街。",
        zh: "悠閒下午的商店街。",
      },
      {
        conditions: { periods: ["afternoon", "morning"] },
        en: "The part of Tokyo that doesn't rush.",
        ja: "急がない東京。",
        zh: "不趕時間的東京。",
      },
    ],
    defaultEn: "The city that was.",
    defaultJa: "かつての街。",
    defaultZh: "曾經的城市。",
    conditions: { periods: ["morning", "earlyMorning", "afternoon"] },
    weight: 1,
  },

  // ── Sangenjaya ────────────────────────────────────────────────────────────
  {
    id: "sangenjaya",
    nameEn: "Sangenjaya",
    nameJa: "三軒茶屋",
    nameZh: "三軒茶屋",
    characterEn: "Dense, lived-in, unpretentious. Not designed for anyone to come and see — just a neighborhood that people end up calling theirs.",
    characterJa: "密度が高く、生活感があって、気取らない。誰かに来てもらうために設計されたわけじゃない。ただ、気づいたら自分の街になっている場所。",
    characterZh: "密集、充滿生活氣息、不裝樣。不是為了讓人來參觀而設計的——只是一個人們最終稱之為自己的地方的街區。",
    longCharacterEn: "Sangenjaya became what it is the same way most good neighborhoods do — residents who had nowhere else to be, shops that opened because something was needed. Nothing here is particularly designed to attract anyone. The result is a density of ordinary things done well: the izakaya at the end of the covered market, the ramen shop without a sign, the bar where the owner has been there since before you could drink. People end up in Sangenjaya and then find it hard to live anywhere else.",
    longCharacterJa: "三軒茶屋は、ほとんどのいい街と同じように、今の姿になった——他に行く場所がない住民と、何かが必要だから開いた店。誰かを惹きつけるために特別に設計されたものは何もない。その結果は、普通のことを上手くやることの密集だ。屋根付き商店街の端の居酒屋、看板のないラーメン屋、店主があなたが飲めるようになる前からいるバー。人々は三軒茶屋に行き着いて、他の場所では暮らしにくくなる。",
    longCharacterZh: "三軒茶屋之所以成為今天這個樣子，和大多數好街區一樣——沒有其他地方可去的居民，因為有需要而開設的商店。這裡沒有任何特別為吸引人而設計的東西。結果是普通事情做得好的一種密集：有頂棚市場末端的居酒屋，沒有招牌的拉麵店，老闆在你能喝酒之前就在那裡的酒吧。人們來到三軒茶屋，然後發現很難在其他地方生活。",
    moments: [
      {
        en: "The ramen shop without a sign is the one you want.",
        ja: "看板のないラーメン屋が、本当に行きたい場所だ。",
        zh: "沒有招牌的拉麵店，才是你真正想去的那一家。",
      },
      {
        en: "You end up in a bar that feels like it has always been here.",
        ja: "ずっとここにあったように感じるバーにいる。",
        zh: "你待在一間感覺永遠都在這裡的酒吧裡。",
      },
      {
        en: "The covered market at midnight. Everything still open.",
        ja: "深夜の商店街。まだすべてが開いている。",
        zh: "深夜的商店街。一切都還開著。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=75",
    imageFilter: "saturate(0.46) brightness(0.34) contrast(1.10)",
    signals: [
      {
        conditions: { periods: ["night", "latenight"] },
        en: "Sangenjaya doesn't quiet down early.",
        ja: "三茶は、早く静かにならない。",
        zh: "三軒茶屋不早睡。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "The covered market and the izakayas. Rain doesn't change this neighborhood.",
        ja: "屋根付きの商店街と居酒屋。雨は、ここを変えない。",
        zh: "有頂棚的市場和居酒屋。雨不會改變這個街區。",
      },
      {
        conditions: { dayTypes: ["friday", "saturday"], periods: ["evening", "night"] },
        en: "Weekend night. People choosing to stay out.",
        ja: "週末の夜。外に残ることを選んだ人たち。",
        zh: "週末夜晚。選擇留在外面的人們。",
      },
    ],
    defaultEn: "The neighborhood people end up calling theirs.",
    defaultJa: "気づいたら自分の街になっている場所。",
    defaultZh: "人們最終稱之為自己的那個街區。",
    conditions: { periods: ["evening", "night", "latenight"] },
    weight: 1,
  },

  // ── Gakugeidaigaku (depth-gated — feeling+) ───────────────────────────────
  {
    id: "gakugeidaigaku",
    nameEn: "Gakugeidaigaku",
    nameJa: "学芸大学",
    nameZh: "學藝大學",
    characterEn: "Small shops, friendly bars, nothing remarkable about it — which is the point. A neighborhood for living in, not visiting.",
    characterJa: "小さい店、気さくなバー、特に何も目立たない——それがいいんだ。観光じゃなく、生活するための街。",
    characterZh: "小店、友善的酒吧、沒有什麼特別的——這正是重點。一個用來生活的街區，不是用來參觀的。",
    longCharacterEn: "Gakugeidaigaku is for people who have spent time in Tokyo and arrived at the understanding that the best neighborhoods are the ones you don't hear about. It doesn't look like much — which is the correct signal. The shotengai is short and local. The bars are small and have regulars. The kind of people you meet here are the kind who know they've found something.",
    longCharacterJa: "学芸大学は、東京でしばらく暮らして、一番いい街は話題にならないところだということに気づいた人のための街だ。見た目はそれほどでもない——それが正しいサインだ。商店街は短くてローカルだ。バーは小さくて常連がいる。ここで出会う人たちは、何かいいものを見つけたと知っている人たちだ。",
    longCharacterZh: "學藝大學是為那些在東京待了一段時間、領悟到最好的街區是那些你不會聽說的地方的人而存在的。它看起來沒什麼特別——這是正確的信號。商店街短小而在地。酒吧小而有常客。在這裡遇到的人，都是那種知道自己找到了好東西的人。",
    moments: [
      {
        en: "The bar where you become a regular after three visits.",
        ja: "三回行くだけで常連になれるバー。",
        zh: "去三次就能成為常客的酒吧。",
      },
      {
        en: "Nobody is here for the reason you would tell someone.",
        ja: "誰も、他の人に伝えるような理由でここにいない。",
        zh: "這裡沒有人是因為你會告訴別人的那種理由來的。",
      },
      {
        en: "A neighborhood that feels like it's letting you in on something.",
        ja: "何かを教えてくれているような気がする街。",
        zh: "一個讓你感覺在告訴你什麼秘密的街區。",
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=75",
    imageFilter: "saturate(0.44) brightness(0.38) contrast(1.06)",
    signals: [
      {
        conditions: { periods: ["evening"], dayTypes: ["weekday"] },
        en: "After work, very local. The bars here feel like your neighborhood bar.",
        ja: "仕事終わり、とてもローカル。ここのバーは、地元のバーみたいな感じがする。",
        zh: "下班後，非常在地。這裡的酒吧感覺就像你的街坊酒吧。",
      },
      {
        conditions: { periods: ["night"] },
        en: "The small bars on quiet streets.",
        ja: "静かな道の小さいバー。",
        zh: "安靜街道上的小酒吧。",
      },
      {
        conditions: { weather: ["rainy", "foggy"] },
        en: "The covered shotengai is good in rain.",
        ja: "雨の日は、商店街の屋根がいい。",
        zh: "雨天，有屋頂的商店街很好。",
      },
    ],
    defaultEn: "Very local. Very quiet. Very good.",
    defaultJa: "とてもローカル。とても静か。とてもいい。",
    defaultZh: "非常在地。非常安靜。非常好。",
    conditions: { periods: ["evening", "night"] },
    weight: 1,
    minChapter: "feeling",
  },
];

// ── Signal selection ────────────────────────────────────────────────────────

function pickSignal(
  n: TokyoNeighborhood,
  period: string,
  condition: string,
  dayType: string,
): { en: string; ja: string; zh: string } {
  const matching = n.signals.filter((s) => {
    if (!s.conditions) return true;
    const c = s.conditions;
    if (c.periods  && !c.periods.includes(period))    return false;
    if (c.weather  && !c.weather.includes(condition))  return false;
    if (c.dayTypes && !c.dayTypes.includes(dayType))   return false;
    return true;
  });
  if (matching.length === 0) return { en: n.defaultEn, ja: n.defaultJa, zh: n.defaultZh };
  const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
  const rng = seededRng(dailySeed * 53 + n.id.charCodeAt(0));
  return matching[Math.floor(rng() * matching.length)];
}

// ── Public API ──────────────────────────────────────────────────────────────

export function getNeighborhoodById(id: string): TokyoNeighborhood | undefined {
  return ALL_NEIGHBORHOODS.find((n) => n.id === id);
}

export function getAllNeighborhoodIds(): string[] {
  return ALL_NEIGHBORHOODS.map((n) => n.id);
}

export function getActiveNeighborhoods(
  period: string,
  condition: string,
  dayType: string,
  hour: number,
  profile?: BehaviorProfile | null,
): TokyoNeighborhood[] {
  const userChapter = profile?.chapter ?? "arriving";

  const scored = ALL_NEIGHBORHOODS.filter((n) => {
    if (n.minChapter && chapterIndex(userChapter) < chapterIndex(n.minChapter)) return false;
    return true;
  }).map((n) => {
    let score = n.weight;
    if (n.conditions.periods?.includes(period))    score += 2;
    if (n.conditions.weather?.includes(condition)) score += 2;
    if (n.conditions.dayTypes?.includes(dayType))  score += 1;

    const dailySeed = Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
    const rng = seededRng(dailySeed * 71 + n.id.charCodeAt(0) + hour);
    score += rng() * 0.6;

    return { n, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 2).map((s) => s.n);
}

// Locale-aware getters
export function getNeighborhoodName(n: TokyoNeighborhood, g: string): string {
  if (g === "ja") return n.nameJa;
  if (g === "zh") return n.nameZh;
  return n.nameEn;
}

export function getNeighborhoodCharacter(n: TokyoNeighborhood, g: string): string {
  if (g === "ja") return n.characterJa;
  if (g === "zh") return n.characterZh;
  return n.characterEn;
}

export function getNeighborhoodLongCharacter(n: TokyoNeighborhood, g: string): string {
  if (g === "ja") return n.longCharacterJa;
  if (g === "zh") return n.longCharacterZh;
  return n.longCharacterEn;
}

export function getNeighborhoodMoment(
  moment: { en: string; ja: string; zh: string },
  g: string,
): string {
  if (g === "ja") return moment.ja;
  if (g === "zh") return moment.zh;
  return moment.en;
}

export function getNeighborhoodSignalText(
  n: TokyoNeighborhood,
  period: string,
  condition: string,
  dayType: string,
  g: string,
): string {
  const signal = pickSignal(n, period, condition, dayType);
  if (g === "ja") return signal.ja;
  if (g === "zh") return signal.zh;
  return signal.en;
}
