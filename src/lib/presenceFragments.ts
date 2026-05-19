// ── Quiet Presence ────────────────────────────────────────────────────────────
// Small evidence that other people are also living through Tokyo tonight.
// Not social. Not interactive. Just: reducing loneliness.
//
// No usernames. No avatars. No likes. No notifications.
// This should feel distant, human, quiet.

export interface PresenceFragment {
  id: string;
  ja: string;
  en: string;
  zh: string;
}

export const PRESENCE_FRAGMENTS: PresenceFragment[] = [

  // ── Staying late ──────────────────────────────────────────────────────────

  {
    id: "last-train-nakano",
    ja: "誰かが今夜、中野で終電を逃した。",
    en: "Someone missed the last train in Nakano tonight.",
    zh: "有人今晚在中野錯過了末班車。",
  },
  {
    id: "still-shimokita",
    ja: "誰かが今もまだ下北沢にいる。",
    en: "Someone is still in Shimokitazawa right now.",
    zh: "有人現在還在下北澤。",
  },
  {
    id: "one-more-drink",
    ja: "誰かが、もう一杯だけ飲むことにした。",
    en: "Someone decided on one more drink.",
    zh: "有人決定再喝一杯。",
  },
  {
    id: "watched-last-train-go",
    ja: "誰かが終電を見送って、歩いて帰ることにした。",
    en: "Someone watched the last train leave and decided to walk home.",
    zh: "有人看著末班車離開，決定走路回家。",
  },
  {
    id: "barely-made-it",
    ja: "誰かが今夜の最終電車に間に合った。ぎりぎりで。",
    en: "Someone made the last train tonight. Barely.",
    zh: "有人今晚趕上了末班車。剛好而已。",
  },
  {
    id: "still-counter-ogikubo",
    ja: "誰かが荻窪のカウンターにまだいる。急いでいない。",
    en: "Someone is still at the counter in Ogikubo. Unhurried.",
    zh: "有人還在荻窪的吧台。不慌不忙。",
  },
  {
    id: "walking-koenji-instead",
    ja: "誰かが電車に乗らず、高円寺を歩いて帰ることにした。",
    en: "Someone chose to walk home through Koenji instead of taking the train.",
    zh: "有人決定走路穿過高円寺，而不是搭電車。",
  },
  {
    id: "jazz-bar-closing",
    ja: "誰かが新宿のジャズバーで閉店まで過ごした。",
    en: "Someone stayed at the jazz bar in Shinjuku until closing.",
    zh: "有人在新宿的爵士酒吧待到打烊。",
  },
  {
    id: "city-quieter-than-expected",
    ja: "誰かが今、歩いて帰っている。思っていたより静かな夜だ。",
    en: "Someone is walking home right now. The city is quieter than they expected.",
    zh: "有人現在正在走路回家。比想像中安靜的夜晚。",
  },
  {
    id: "missed-stop",
    ja: "誰かが今夜、一駅分乗り過ごした。引き返して歩いた。",
    en: "Someone missed their stop by one station tonight. Walked back.",
    zh: "有人今晚多坐了一站。走路走回來了。",
  },

  // ── Again / Routine ───────────────────────────────────────────────────────

  {
    id: "river-again",
    ja: "誰かが今夜も川沿いを歩いた。",
    en: "Someone walked along the river again tonight.",
    zh: "有人今晚又沿著河邊走了。",
  },
  {
    id: "same-seat-again",
    ja: "誰かが今週もまた同じ席に座った。",
    en: "Someone sat in the same seat again this week.",
    zh: "有人這週又坐在同一個座位。",
  },
  {
    id: "same-morning-coffee",
    ja: "誰かが中目黒の同じコーヒー屋に、毎朝来ている。",
    en: "Someone has been coming to the same coffee shop in Nakameguro every morning.",
    zh: "有人每天早上都去中目黒的同一家咖啡店。",
  },
  {
    id: "shakujii-bench-again",
    ja: "誰かが今日も石神井公園の同じベンチに座った。",
    en: "Someone sat on the same bench at Shakujii Park again today.",
    zh: "有人今天又坐在石神井公園同一張椅子上。",
  },
  {
    id: "oyama-weekly-shopping",
    ja: "誰かが大山で週に一度の買い物をして、帰った。",
    en: "Someone did their weekly shopping in Oyama. Then went home.",
    zh: "有人在大山做了每週的採購，然後回家了。",
  },
  {
    id: "ramen-counter-third-time",
    ja: "誰かが今週三度目のラーメンを同じカウンターで食べた。",
    en: "Someone ate ramen at the same counter for the third time this week.",
    zh: "有人這週第三次在同一個吧台吃拉麵了。",
  },
  {
    id: "sento-same-spot",
    ja: "誰かが銭湯で、毎回同じ場所に荷物を置く。",
    en: "Someone puts their things in the same spot at the public bath. Every time.",
    zh: "有人每次去錢湯都把東西放在同一個地方。",
  },
  {
    id: "same-route-six-months",
    ja: "誰かが、もう六ヶ月同じ道を歩いていることに気づいた。",
    en: "Someone realized they've been taking the same route for six months.",
    zh: "有人發現自己走同一條路已經走了六個月了。",
  },
  {
    id: "kagurazaka-long-way",
    ja: "誰かが神楽坂を遠回りして帰った。",
    en: "Someone walked the long way home through Kagurazaka.",
    zh: "有人繞路走過神楽坂回家。",
  },
  {
    id: "commute-same-face",
    ja: "誰かが通勤中に、また同じ人を見かけた。何も言わなかった。",
    en: "Someone noticed the same person on their commute again. Said nothing.",
    zh: "有人通勤時又看到同一個人了。什麼都沒說。",
  },

  // ── Small discoveries ─────────────────────────────────────────────────────

  {
    id: "found-record-koenji",
    ja: "誰かが今夜、ずっと探していたレコードを見つけた。",
    en: "Someone found a record they'd been looking for. Tonight.",
    zh: "有人今晚找到了一直在找的那張黑膠。",
  },
  {
    id: "finally-the-book",
    ja: "誰かがずっと気になっていた本を、ようやく手に取った。",
    en: "Someone finally picked up the book they'd been meaning to read.",
    zh: "有人終於拿起了一直想讀的那本書。",
  },
  {
    id: "fragment-koenji",
    ja: "少し前に、高円寺で何かが見つかった。",
    en: "Something was found in Koenji a little while ago.",
    zh: "不久前，有東西在高円寺被找到了。",
  },
  {
    id: "nishi-ogikubo-standing-reading",
    ja: "誰かが西荻窪の古本屋で一時間以上立ち読みした。",
    en: "Someone stood reading in a used bookshop in Nishi-Ogikubo for over an hour.",
    zh: "有人在西荻窪的二手書店站著看書超過一小時。",
  },
  {
    id: "late-at-tsite",
    ja: "誰かが深夜の代官山蔦屋で、まだ本を選んでいる。",
    en: "Someone is still choosing a book at Daikanyama T-Site. It's late.",
    zh: "有人還在深夜的代官山蔦屋選書。已經很晚了。",
  },
  {
    id: "first-regular",
    ja: "誰かが今夜、常連として認識された。名前は知られていない。",
    en: "Someone was recognized tonight as a regular. Their name still unknown.",
    zh: "有人今晚被認出是熟客了。但名字還是沒人知道。",
  },
  {
    id: "first-words-with-bartender",
    ja: "誰かが今夜初めて、バーのマスターと少し話した。",
    en: "Someone spoke to the bartender for the first time tonight. Just a little.",
    zh: "有人今晚第一次和酒吧老闆說了幾句話。",
  },

  // ── Transit / The city ────────────────────────────────────────────────────

  {
    id: "local-train-end-of-line",
    ja: "誰かが各駅停車で終点まで乗った。",
    en: "Someone rode the local train all the way to the end of the line.",
    zh: "有人搭著普通車一路坐到終點。",
  },
  {
    id: "chose-local-over-express",
    ja: "誰かが今夜、急行ではなく各駅停車を選んだ。",
    en: "Someone chose the local train over the express tonight.",
    zh: "有人今晚選了普通車，沒有搭急行。",
  },
  {
    id: "last-train-shakujii",
    ja: "石神井公園の終電が出た。誰かが乗っていた。",
    en: "The last train just left Shakujii Park. Someone was on it.",
    zh: "石神井公園的末班車剛走了。有人在上面。",
  },
  {
    id: "not-wanting-to-go-home",
    ja: "誰かが今夜、帰りたくないと思いながら電車に乗った。",
    en: "Someone got on the train tonight not really wanting to go home.",
    zh: "有人今晚不太想回家，但還是搭上了電車。",
  },
  {
    id: "moon-over-shinjuku",
    ja: "誰かが今夜、新宿の上に月があることに気づいた。",
    en: "Someone looked up and noticed the moon over Shinjuku tonight.",
    zh: "有人今晚抬頭看到新宿上空的月亮。",
  },

  // ── Weather ───────────────────────────────────────────────────────────────

  {
    id: "walking-in-rain",
    ja: "誰かが雨の中、急がずに歩いている。",
    en: "Someone is walking through the rain without hurrying.",
    zh: "有人走在雨中，不慌不忙。",
  },
  {
    id: "arcade-in-rain",
    ja: "誰かが雨の日、アーケードをゆっくり歩いた。濡れずに。",
    en: "Someone walked slowly through the covered arcade. Dry, while it rained.",
    zh: "有人在雨天慢慢走過有蓋拱廊。不用淋雨。",
  },
  {
    id: "cafe-in-nishi-ogikubo",
    ja: "誰かが今、西荻窪のカフェにいる。急いでいない。",
    en: "Someone is in a café in Nishi-Ogikubo right now. Not in any hurry.",
    zh: "有人現在在西荻窪的咖啡廳裡。不慌不忙。",
  },
  {
    id: "no-umbrella-on-purpose",
    ja: "誰かが傘を持たずに、雨の中を歩いた。わざと。",
    en: "Someone walked through the rain without an umbrella. By choice.",
    zh: "有人刻意沒帶傘走在雨中。",
  },

  // ── Alone but fine ────────────────────────────────────────────────────────

  {
    id: "dinner-alone-fine",
    ja: "誰かが一人で夕飯を食べに来た。それで良い。",
    en: "Someone came for dinner alone tonight. That's fine.",
    zh: "有人獨自來吃晚餐。這樣很好。",
  },
  {
    id: "counter-alone-unbothered",
    ja: "誰かが今夜も、東京のどこかのカウンターに一人で座っている。",
    en: "Someone is sitting alone at a counter somewhere in Tokyo tonight. Unbothered.",
    zh: "有人今晚又獨自坐在東京某個地方的吧台。",
  },
  {
    id: "no-reason-to-go-out",
    ja: "誰かが今夜、特に理由もなく外に出た。",
    en: "Someone went out tonight for no particular reason.",
    zh: "有人今晚沒有特別的理由就出門了。",
  },
  {
    id: "asleep-page-folded",
    ja: "誰かが今夜、ページを折ったまま眠ってしまった。",
    en: "Someone fell asleep with the page still folded.",
    zh: "有人今晚折著頁角睡著了。",
  },
  {
    id: "yanaka-quieter",
    ja: "誰かが今夜、谷中を歩いた。思っていたより静かだった。",
    en: "Someone walked through Yanaka tonight. Quieter than they expected.",
    zh: "有人今晚走過谷中。比想像中安靜。",
  },

  // ── Quietly human ─────────────────────────────────────────────────────────

  {
    id: "just-a-little-longer",
    ja: "誰かが「もう少しだけここにいよう」と思った。",
    en: "Someone thought: just a little longer here.",
    zh: "有人想著：再待一會兒就好。",
  },
  {
    id: "warming-to-tokyo",
    ja: "誰かが今夜、東京が少しだけ好きになった。",
    en: "Someone warmed up to Tokyo a little more tonight.",
    zh: "有人今晚對東京又多了一點好感。",
  },
  {
    id: "called-it-neighborhood",
    ja: "誰かが今日初めて、そこを「自分の街」と呼んだ。",
    en: "Someone called it their neighborhood for the first time today.",
    zh: "有人今天第一次把那裡叫做「我的地方」。",
  },
  {
    id: "sense-of-belonging",
    ja: "誰かが一瞬だけ、この街のどこかに属しているような気がした。",
    en: "Someone felt, briefly, like they belonged somewhere in this city.",
    zh: "有人有那麼一瞬間，感覺自己屬於這座城市的某個地方。",
  },
  {
    id: "still-figuring-out",
    ja: "誰かがまだ、この街を探している。でも前よりは分かってきた。",
    en: "Someone is still figuring out this city. But less so than before.",
    zh: "有人還在摸索這座城市。但比以前更懂了一點。",
  },
  {
    id: "one-more-week",
    ja: "誰かの東京がもう一週間で終わる。もう恋しくなっている。",
    en: "Someone has one more week in Tokyo. They're already going to miss it.",
    zh: "有人在東京還剩一週。已經開始想念了。",
  },
  {
    id: "thinking-of-moving-here",
    ja: "誰かが時々、ここに引っ越すことを考える。今夜は、できそうな気がした。",
    en: "Someone thinks about moving here sometimes. Tonight it felt possible.",
    zh: "有人有時候會想搬到這裡。今晚感覺好像真的可以。",
  },
  {
    id: "less-alone-tonight",
    ja: "誰かが今夜、理由は分からないが、少し孤独でなくなった。",
    en: "Someone felt less alone tonight. For no reason they could name.",
    zh: "有人今晚不那麼孤獨了。說不出原因。",
  },
];

// ── Seeded pick ───────────────────────────────────────────────────────────────

function seededRng(seed: number): () => number {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Returns a fragment that changes every 20 minutes Tokyo time. */
export function getPresenceFragment(): PresenceFragment {
  const windowMs  = 20 * 60 * 1000;
  const windowIdx = Math.floor((Date.now() + 9 * 3600 * 1000) / windowMs);
  const rng = seededRng(windowIdx);
  return PRESENCE_FRAGMENTS[Math.floor(rng() * PRESENCE_FRAGMENTS.length)];
}

export function getFragmentText(f: PresenceFragment, locale: string): string {
  if (locale === "ja") return f.ja;
  if (locale === "zh-TW" || locale === "zh-CN") return f.zh;
  return f.en;
}
