import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";
import type { TokyoChapter } from "./tokyoRelationship";

interface NudgeLine {
  periods?:    AtmospherePeriod[];
  conditions?: WeatherCondition[];
  text:        string;
}

// ── Chapter-specific nudge pools ───────────────────────────────────────────
// Each chapter carries its own emotional register. The writing here is the
// actual relationship — it needs to be honest, not performative.

// ARRIVING — first sessions, city is still unfamiliar.
// Platform gives permission to be disoriented. No pressure, no fixing.
const ARRIVING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "Cities feel different at night when you don't know them yet. That changes slowly." },
  { periods: ["latenight"],                     text: "The konbini at 1am. You'll start to have a preferred one eventually." },
  { periods: ["dawn"],                          text: "Being up before the city knows what it's doing is a way of entering it." },
  { periods: ["morning"],                       text: "You don't know this city yet. That's not a problem right now." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Morning in Tokyo looks simple from outside. It isn't, but you'll figure it out." },
  { periods: ["daytime"],                       text: "Getting lost in the first weeks means you're paying attention." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "A rainy afternoon inside counts as part of arriving somewhere new." },
  { periods: ["sunset", "evening"],             text: "The city after 5pm is different from the city you stepped off the plane into." },
  { periods: ["night"],                         text: "Still early. You'll know this city much better than you do right now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Your first rainy nights in a new city count for something." },
  {                                             text: "Every neighborhood looks the same until one suddenly doesn't." },
  {                                             text: "Some things about Tokyo only become clear on the third time." },
  {                                             text: "The first month is mostly logistics. That is not a failure." },
  {                                             text: "Tokyo asks a lot in the beginning. It does that to everyone." },
  {                                             text: "One small thing today is enough." },
  {                                             text: "You're still in the part where nothing feels like it fits yet." },
  {                                             text: "The city has a lot of rooms. You haven't found yours yet. That's fine." },
];

// ADJUSTING — the harder middle months. The wall period.
// This is the most important chapter to write honestly.
// The platform should not perform cheerfulness here. It should simply be present.
const ADJUSTING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "Late nights are harder when home still feels uncertain." },
  { periods: ["latenight"],                     text: "Being awake at this hour during a hard month is its own particular thing." },
  { periods: ["latenight"], conditions: ["rainy"], text: "Rain at 1am during a difficult stretch. You're not the first person here for this." },
  { periods: ["dawn"],                          text: "Being up this early during a hard period is not the same as being okay. That's fine." },
  { periods: ["morning"],                       text: "Not every morning here needs to be a good one." },
  { periods: ["morning"],                       text: "Getting up and doing the basic things is enough for now." },
  { periods: ["morning"],  conditions: ["rainy"],  text: "Rain on a difficult morning. The city asks less of you today." },
  { periods: ["daytime"],                       text: "Some days the city just asks too much." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "Rainy afternoons inside are allowed. You don't have to make them mean anything." },
  { periods: ["evening"],                       text: "It gets easier to be out in the evenings once you have even one or two places." },
  { periods: ["evening"],  conditions: ["rainy"],  text: "Rain in the evening is when Tokyo asks the least of you." },
  { periods: ["night"],                         text: "Some nights this city is very good at being alive without you. That does change." },
  { periods: ["night"],    conditions: ["rainy"],  text: "There's a particular loneliness that rain at night makes legible. You're not imagining it." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain at 10pm when you're in the hard months. You're among a specific few out tonight." },
  {                                             text: "Some weeks Tokyo is just endurance. That's allowed." },
  {                                             text: "Month three is when most people struggle. You're not the exception, and you're not failing." },
  {                                             text: "Loneliness in a crowd is its own particular weight. The city doesn't fix that." },
  {                                             text: "You can have a hard month here and still be okay." },
  {                                             text: "The silence here isn't unfriendly. It's just not talking to you yet." },
  {                                             text: "Not every day here has to mean something." },
  {                                             text: "The people who stay knew a hard month was coming. You're in it." },
  {                                             text: "Tokyo has a way of making loneliness feel like a personal failure. It isn't." },
  {                                             text: "You're allowed to be having a difficult time here." },
];

// FEELING — something is beginning to stick. Quiet emerging rootedness.
// Platform notices without making it a celebration.
const FEELING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "The city starts to feel different when you know which vending machine is around the corner." },
  { periods: ["dawn"],                          text: "You've started to know what the city sounds like at this hour." },
  { periods: ["morning"],                       text: "You already know which direction to walk from here." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Morning here starts to feel different once you know what it leads to." },
  { periods: ["daytime"],                       text: "Some alleys are starting to look familiar before you know their names." },
  { periods: ["daytime"],  conditions: ["rainy"],  text: "You know which covered route to take now." },
  { periods: ["sunset"],                        text: "You've seen this light before." },
  { periods: ["evening"],                       text: "You've started to have a few places. That matters more than it sounds." },
  { periods: ["night"],                         text: "You know what kind of night this is now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "The rain sounds different on a street you've walked before." },
  {                                             text: "Something is starting to stick." },
  {                                             text: "The city is starting to organize itself around your routes." },
  {                                             text: "There's a version of Tokyo that's beginning to be yours." },
  {                                             text: "You know which konbini you prefer. That's belonging in miniature." },
  {                                             text: "Some places are starting to feel less like directions and more like somewhere you go." },
  {                                             text: "You've started to have preferences about this city. That's a different relationship." },
  {                                             text: "The city has started to feel the same size as you." },
];

// BELONGING — routines exist, places are yours, the city organized itself around you.
// Platform speaks from familiarity, not encouragement.
const BELONGING: NudgeLine[] = [
  { periods: ["latenight"],                     text: "You know what the city sounds like at this hour." },
  { periods: ["dawn"],                          text: "The city before 7am still belongs to almost no one. Including you." },
  { periods: ["morning"],                       text: "You've walked this way before." },
  { periods: ["morning"],  conditions: ["clear"],  text: "A clear morning in a city you know. That's a different thing than it used to be." },
  { periods: ["daytime"],                       text: "There are parts of this city that have started to feel like yours." },
  { periods: ["sunset"],                        text: "You've watched this light change before." },
  { periods: ["sunset", "evening"],             text: "The city asks less of you now." },
  { periods: ["night"],                         text: "Late in a city that became familiar before you noticed." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain on a street you know well." },
  { periods: ["night"],    conditions: ["rainy"],  text: "You know where to walk in weather like this." },
  {                                             text: "The places that are yours are yours now." },
  {                                             text: "Some corners of this city know you by now." },
  {                                             text: "Tokyo asked a lot and you stayed. That's not nothing." },
  {                                             text: "You've earned a certain kind of quiet here." },
  {                                             text: "The city adjusted to you, a little." },
  {                                             text: "You're no longer arriving. You live here now." },
];

// HOME — long-term presence. Seasonal memory. Wistful, earned, unhurried.
// Platform speaks the way someone does after years somewhere.
const HOME: NudgeLine[] = [
  { periods: ["latenight"],                     text: "This is a familiar quiet now." },
  { periods: ["dawn"],                          text: "You've watched this city wake up before." },
  { periods: ["morning"],  conditions: ["clear"],  text: "Clear morning. The mountains are probably visible from the right platform." },
  { periods: ["morning"],                       text: "The city before 7am still asks nothing of you." },
  { periods: ["evening"],                       text: "Another evening in a city that became home without you deciding it." },
  { periods: ["night"],                         text: "Still in this city. That wasn't obvious when you arrived." },
  { periods: ["night"],    conditions: ["rainy"],  text: "Rain in Tokyo. You know what this sounds like from inside now." },
  { periods: ["night"],    conditions: ["rainy"],  text: "You've walked in weather like this before. You know what it costs." },
  {                        conditions: ["snowy"],   text: "Snow in Tokyo again. You recognize this particular quiet." },
  {                                             text: "The cold has come back. You recognize it this time." },
  {                                             text: "A year ago this corner was still unfamiliar." },
  {                                             text: "You know what Tokyo sounds like in February now." },
  {                                             text: "The city is different when you've watched it change." },
  {                                             text: "You've been here through one full summer." },
  {                                             text: "Tokyo is where you live. You found that out slowly." },
  {                                             text: "The seasons have a different meaning once you've seen them here before." },
];

const CHAPTER_NUDGES: Record<TokyoChapter, NudgeLine[]> = {
  arriving:   ARRIVING,
  adjusting:  ADJUSTING,
  feeling:    FEELING,
  belonging:  BELONGING,
  home:       HOME,
};

// ── Return nudges — shown when returning after 7+ day gap ─────────────────
// The city quietly acknowledges the absence. One day only, then back to chapter tone.
const RETURN_SHORT: string[] = [    // 7–14 day gap
  "The city is still here.",
  "You were away for a while.",
  "Some time away and then back.",
];
const RETURN_MEDIUM: string[] = [   // 14–30 days
  "You were away for a while. Tokyo hasn't changed much.",
  "The city waited.",
  "Longer away this time.",
];
const RETURN_LONG: string[] = [     // 30+ days
  "Coming back after a long time. Tokyo looks the same from outside.",
  "Some time away. The city is quieter than you remembered, or you're quieter.",
  "Back. That's something.",
];

// ── Generic fallback nudges (period × weather, no chapter context) ────────
type PeriodNudges = Partial<Record<WeatherCondition | "any", string[]>>;

const NUDGES: Partial<Record<AtmospherePeriod, PeriodNudges>> = {
  latenight: {
    clear: [
      "Somewhere in Kōenji a vending machine is the only warm thing on the block.",
      "The convenience stores are quieter after midnight.",
      "The last train already passed. No reason to hurry anywhere.",
    ],
    rainy: [
      "Rain at 1am has a different weight than rain at noon.",
      "The underground passages stay dry. You don't have to.",
      "Konbini umbrellas are ¥500. Probably worth it tonight.",
    ],
    foggy: [
      "Fog in Tokyo is rare. Worth going out in.",
      "The city fades out around 200 meters tonight.",
    ],
    any: [
      "The city after midnight belongs to a smaller Tokyo.",
      "There are fewer people out. That's different from being alone.",
    ],
  },
  dawn: {
    clear: [
      "The bicycle lots are still half-empty for another twenty minutes.",
      "Platforms carry a different population before 7am.",
    ],
    rainy: [
      "Dawn rain in Tokyo. The city comes awake into it.",
    ],
    any: [
      "The city before 7am belongs to almost no one.",
      "Morning platforms carry a different weight.",
    ],
  },
  morning: {
    clear: [
      "Yanaka before noon, before the café queues.",
      "Concrete in winter morning light looks like a different material.",
      "The same route looks different before noon.",
    ],
    rainy: [
      "Rain gives the morning permission to slow down.",
      "Coin laundries are usually empty before 9.",
      "A covered shotengai somewhere is doing fine today.",
    ],
    any: [
      "The discount stickers don't go on until this evening.",
      "Morning in Tokyo belongs mostly to people who live here.",
    ],
  },
  daytime: {
    clear: [
      "Some alleys only reveal themselves in afternoon light.",
      "Thirty minutes on the Tamagawa embankment costs nothing.",
      "A platform somewhere has a view of the mountains on clear days.",
    ],
    rainy: [
      "Rainy afternoon: family restaurant, drip coffee, no one hurrying you.",
      "The covered shopping streets earned their roofs today.",
    ],
    foggy: [
      "Fog at midday in Tokyo is disorienting in a good way.",
    ],
    any: [
      "Some places are better visited without a plan.",
    ],
  },
  sunset: {
    clear: [
      "Bridges catch the light for about twenty minutes around now.",
      "The Tamagawa embankment, side-lit before it gets dark.",
      "The vegetable vendors are packing up.",
    ],
    rainy: [
      "The wet street doubles everything it reflects right now.",
      "Find somewhere with a window facing out.",
    ],
    any: [
      "A reasonable hour to leave your room.",
      "The city changes in the thirty minutes after sundown.",
    ],
  },
  evening: {
    clear: [
      "The discount sticker hour is 7pm at the local Seiyu. Worth knowing.",
      "Canal benches after 9pm: mostly empty, occasionally herons.",
      "The evening platforms carry people who have just stopped working.",
    ],
    rainy: [
      "Rain in the evening is the most Tokyo kind of weather.",
      "Someone else is also deciding whether to go out tonight.",
      "The overpasses near Shimbashi stay dry enough.",
    ],
    any: [
      "Still an hour or two before it gets late.",
      "The city at this hour has already made most of its decisions.",
    ],
  },
  night: {
    clear: [
      "The residential streets in Nerima don't perform being Tokyo.",
      "The bookshop district in Jimbochō goes quiet after 9.",
      "Still time before midnight.",
    ],
    rainy: [
      "Rain at 10pm. Unusually good walking weather.",
      "The coin laundry glows in the rain.",
      "If you go out now you'll be among the few.",
    ],
    foggy: [
      "Fog tonight. The city fades out around 200 meters.",
    ],
    cloudy: [
      "Overcast nights make the city lights diffuse in a good way.",
    ],
    any: [
      "Cold enough to make a vending machine coffee mean something.",
      "The city at night is a different size than the city by day.",
    ],
  },
};

const FALLBACK = [
  "Tokyo has more rooms than you've seen.",
  "One small thing tonight.",
  "The city is still out there.",
  "You don't have to go far.",
];

// ── Selection ──────────────────────────────────────────────────────────────

// Consistent within a calendar day (UTC+9) so the line stays the same all day
function dailySeed(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
}

function pick<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

function fromPool(pool: NudgeLine[], period: AtmospherePeriod, condition: WeatherCondition, seed: number): string | null {
  // Best match: period + condition
  let candidates = pool.filter(
    (l) =>
      (!l.periods    || l.periods.includes(period)) &&
      (!l.conditions || l.conditions.includes(condition)),
  );
  if (candidates.length > 0) return pick(candidates, seed).text;

  // Fallback: period only
  candidates = pool.filter(
    (l) => !l.conditions && (!l.periods || l.periods.includes(period)),
  );
  if (candidates.length > 0) return pick(candidates, seed).text;

  // Fallback: generic within chapter pool
  candidates = pool.filter((l) => !l.periods && !l.conditions);
  if (candidates.length > 0) return pick(candidates, seed).text;

  return null;
}

// ── Locale-specific compact nudge pools ────────────────────────────────────
// Smaller but emotionally complete pools for each locale and chapter.
// Returns null rather than an English fallback if no match found.

interface LocaleNudgePool {
  arriving:  NudgeLine[];
  adjusting: NudgeLine[];
  feeling:   NudgeLine[];
  belonging: NudgeLine[];
  home:      NudgeLine[];
  returning_short:  string[];
  returning_medium: string[];
  returning_long:   string[];
  fallback: string[];
}

const NUDGE_JA: LocaleNudgePool = {
  arriving: [
    { periods: ["latenight"], text: "夜の知らない街は、昼間とは違う速さで歩ける。それは変わっていく。" },
    { periods: ["dawn"],      text: "街が何をするか知らないうちに起きている。それも、入り方のひとつだ。" },
    { periods: ["morning"],   text: "まだこの街のことはわからない。今はそれでいい。" },
    { periods: ["daytime"],   text: "最初の数週間に迷うのは、ちゃんと見ている証拠だ。" },
    { periods: ["evening"],   text: "夜の街は、飛行機を降りた日とは別の顔を持っている。" },
    { periods: ["night"],     text: "まだ早い段階だ。この街をもっと知っていく。" },
    { text: "どの街区も同じに見える、ある日突然違って見えるまでは。" },
    { text: "最初の月は、ほとんどが手続きだ。それは失敗じゃない。" },
    { text: "東京は最初、多くを求めてくる。みんなそうだ。" },
    { text: "今日、小さなひとつのことができれば十分だ。" },
  ],
  adjusting: [
    { periods: ["latenight"], text: "居場所がまだ不安定な時の深夜は、特別なものがある。" },
    { periods: ["morning"],   text: "ここでの朝は、毎回良い朝じゃなくていい。" },
    { periods: ["daytime"],   text: "東京が多すぎる日がある。そういう日もある。" },
    { periods: ["evening"],   text: "行きつけの場所がひとつかふたつあると、夜が変わる。" },
    { periods: ["night"],     text: "この街が自分なしに生きているように見える夜がある。それは変わる。" },
    { text: "3ヶ月目は、多くの人が折れる。あなたは例外じゃないし、失敗でもない。" },
    { text: "ここでは孤独が個人の失敗に見える。そうじゃない。" },
    { text: "つらい時期がここにあっていい。" },
    { text: "東京の沈黙は、あなたに無関心なわけじゃない。まだ話しかけてきていないだけだ。" },
    { text: "何週間かは、耐えることがすべてでいい。" },
  ],
  feeling: [
    { periods: ["latenight"], text: "角にある自動販売機がどれか知っている。それが変化の始まりだ。" },
    { periods: ["morning"],   text: "ここからどの方向に歩けばいいか、もうわかる。" },
    { periods: ["daytime"],   text: "名前も知らない路地が、見覚えのある顔になってきた。" },
    { periods: ["evening"],   text: "行きつけの場所がいくつかある。それは思ったより大きなことだ。" },
    { periods: ["night"],     text: "今夜どんな夜か、もうわかる。" },
    { text: "何かが定着し始めている。" },
    { text: "街が自分のルートに合わせて整理され始めている。" },
    { text: "コンビニの好みができた。それは小さな帰属だ。" },
    { text: "この街について、好みが出てきた。関係が変わった証拠だ。" },
  ],
  belonging: [
    { periods: ["morning"],   text: "ここをこう歩いたことがある。" },
    { periods: ["daytime"],   text: "自分のものになってきた場所がある。" },
    { periods: ["evening"],   text: "街に求められることが減った。" },
    { periods: ["night"],     text: "気づかないうちに馴染みになった街の中の夜。" },
    { text: "自分のものになった場所は、もう自分のものだ。" },
    { text: "東京はたくさん求めてきた。それでも残った。それはたいしたことだ。" },
    { text: "もう到着していない。ここに住んでいる。" },
    { text: "街が少し、こちらに合わせてくれた。" },
  ],
  home: [
    { periods: ["latenight"], text: "もう慣れた静けさだ。" },
    { periods: ["dawn"],      text: "この街が目覚めるのを見たことがある。" },
    { periods: ["evening"],   text: "決めたわけじゃないのに、ホームになった街のまた夕方。" },
    { periods: ["night"],     text: "まだこの街にいる。来た時には、それは確かじゃなかった。" },
    { text: "一年前、この角はまだ知らない場所だった。" },
    { text: "東京の二月の音を知っている。" },
    { text: "季節は、ここで一度見た後は意味が変わる。" },
    { text: "ひとつの夏をここで過ごした。" },
  ],
  returning_short:  ["まだここにある。", "少し離れていた。", "また戻った。"],
  returning_medium: ["しばらくぶりだった。東京はあまり変わっていない。", "街は待っていた。", "今回は少し長かった。"],
  returning_long:   ["長い時間が経った後に戻ってきた。", "しばらくいなかった。街は静かなまま。", "戻ってきた。それだけで何かだ。"],
  fallback: ["東京にはまだ見ていない部屋がある。", "小さなひとつを今夜。", "街はまだそこにある。"],
};

const NUDGE_ZH_TW: LocaleNudgePool = {
  arriving: [
    { periods: ["latenight"], text: "不熟悉的城市在夜晚有不同的節奏。那種感覺會慢慢改變。" },
    { periods: ["morning"],   text: "還不了解這座城市。現在這樣就可以了。" },
    { periods: ["daytime"],   text: "剛開始幾週迷路，代表你在認真看。" },
    { periods: ["evening"],   text: "下午五點後的城市跟你下飛機那天不一樣了。" },
    { periods: ["night"],     text: "還早。你會比現在更了解這座城市。" },
    { text: "每個街區看起來都一樣，直到某天突然不一樣了。" },
    { text: "第一個月大多是手續。那不是失敗。" },
    { text: "東京一開始要求很多。對每個人都這樣。" },
    { text: "今天，一件小事就夠了。" },
  ],
  adjusting: [
    { periods: ["latenight"], text: "還沒有安定感時候的深夜，有它特別的重量。" },
    { periods: ["morning"],   text: "這裡的每個早晨不都需要是好的早晨。" },
    { periods: ["daytime"],   text: "有些天東京就是太多了。那也沒關係。" },
    { periods: ["evening"],   text: "有一兩個地方之後，晚上會不一樣。" },
    { periods: ["night"],     text: "有些夜晚這座城市好像不需要你就能活著。那會改變的。" },
    { text: "第三個月是大多數人撐不住的時候。你不是例外，你也沒有失敗。" },
    { text: "東京會讓孤獨看起來像個人的失敗。不是那樣的。" },
    { text: "你可以在這裡度過一段困難的時期。" },
    { text: "東京的沉默不是對你不友善，只是還沒開口跟你說話。" },
  ],
  feeling: [
    { periods: ["morning"],   text: "已經知道從這裡往哪個方向走了。" },
    { periods: ["daytime"],   text: "連名字都不知道的巷子，開始有熟悉的感覺了。" },
    { periods: ["evening"],   text: "有了幾個固定的地方，比聽起來重要。" },
    { text: "有什麼東西開始留下來了。" },
    { text: "城市開始照著你的路線整理自己。" },
    { text: "知道自己比較喜歡哪間便利商店了。那是一種小小的歸屬。" },
  ],
  belonging: [
    { periods: ["morning"],   text: "這條路走過了。" },
    { periods: ["daytime"],   text: "有些地方開始像是你的了。" },
    { periods: ["evening"],   text: "城市對你的要求變少了。" },
    { periods: ["night"],     text: "在不知不覺中變熟悉的城市裡的夜晚。" },
    { text: "你的地方現在就是你的地方了。" },
    { text: "你已經不再是剛到的人了，你住在這裡。" },
  ],
  home: [
    { periods: ["latenight"], text: "這是熟悉的安靜了。" },
    { periods: ["evening"],   text: "又是這座不知不覺成為家的城市的傍晚。" },
    { periods: ["night"],     text: "還在這座城市。剛來的時候那不是理所當然的事。" },
    { text: "一年前，這個角落還不認識。" },
    { text: "知道東京二月聽起來是什麼聲音了。" },
    { text: "在這裡過了一個完整的夏天。" },
  ],
  returning_short:  ["還在這裡。", "離開了一陣子。", "回來了。"],
  returning_medium: ["不在了一段時間。東京沒怎麼變。", "城市等著。", "這次久一點。"],
  returning_long:   ["過了很長時間才回來。", "不在了一段時間，城市還是安靜的。", "回來了。這就是一件事。"],
  fallback: ["東京還有你沒發現的房間。", "今晚一件小事。", "城市還在那裡。"],
};

const NUDGE_KO: LocaleNudgePool = {
  arriving: [
    { periods: ["latenight"], text: "모르는 도시는 밤에 다른 속도로 걸을 수 있어. 그건 천천히 바뀌어." },
    { periods: ["morning"],   text: "아직 이 도시를 잘 몰라. 지금은 그래도 돼." },
    { periods: ["daytime"],   text: "처음 몇 주에 길을 잃는 건 제대로 보고 있다는 뜻이야." },
    { periods: ["evening"],   text: "오후 다섯 시 이후의 도시는 비행기에서 내린 날과 달라." },
    { periods: ["night"],     text: "아직 초반이야. 이 도시를 훨씬 더 알게 될 거야." },
    { text: "모든 동네가 똑같아 보이다가 어느 날 갑자기 달라 보여." },
    { text: "첫 달은 대부분 서류 작업이야. 그건 실패가 아니야." },
    { text: "도쿄는 처음에 많은 걸 요구해. 모두한테 그래." },
    { text: "오늘, 작은 것 하나면 충분해." },
  ],
  adjusting: [
    { periods: ["latenight"], text: "아직 자리를 못 잡은 시기의 새벽은 특별한 무게가 있어." },
    { periods: ["morning"],   text: "여기서의 모든 아침이 좋은 아침일 필요는 없어." },
    { periods: ["daytime"],   text: "어떤 날은 도쿄가 너무 많아. 그런 날도 있어." },
    { periods: ["night"],     text: "어떤 밤엔 이 도시가 나 없이도 잘 사는 것 같아. 그건 바뀌어." },
    { text: "3개월 차가 대부분 힘든 시기야. 넌 예외가 아니고, 실패한 것도 아니야." },
    { text: "도쿄는 외로움을 개인의 실패처럼 느끼게 해. 그게 아니야." },
    { text: "여기서 힘든 시기를 보내도 돼." },
    { text: "도쿄의 침묵은 너한테 적대적인 게 아니야. 아직 말을 걸지 않는 것뿐이야." },
  ],
  feeling: [
    { periods: ["morning"],   text: "여기서 어느 방향으로 가야 할지 이미 알아." },
    { periods: ["daytime"],   text: "이름도 모르는 골목이 낯익어지기 시작했어." },
    { periods: ["evening"],   text: "가는 곳이 몇 군데 생겼어. 들리는 것보다 중요해." },
    { text: "뭔가 정착되기 시작하고 있어." },
    { text: "도시가 내 루트에 맞춰서 정리되기 시작하고 있어." },
    { text: "어느 편의점이 더 좋은지 알게 됐어. 그게 작은 소속감이야." },
  ],
  belonging: [
    { periods: ["morning"],   text: "이 길은 전에 걸어봤어." },
    { periods: ["daytime"],   text: "내 것처럼 느껴지기 시작한 곳들이 있어." },
    { periods: ["evening"],   text: "도시가 나한테 요구하는 게 줄었어." },
    { text: "내 곳은 이제 내 곳이야." },
    { text: "더 이상 도착하는 게 아니야. 여기서 살고 있어." },
  ],
  home: [
    { periods: ["latenight"], text: "이제 익숙한 고요함이야." },
    { periods: ["evening"],   text: "어느새 집이 된 도시의 또 다른 저녁." },
    { periods: ["night"],     text: "아직 이 도시에 있어. 처음 왔을 때는 그게 당연하지 않았어." },
    { text: "1년 전, 이 모퉁이는 낯선 곳이었어." },
    { text: "도쿄의 2월이 어떤 소리인지 알아." },
    { text: "여기서 한 번의 여름을 보냈어." },
  ],
  returning_short:  ["아직 여기 있어.", "잠깐 자리를 비웠어.", "돌아왔어."],
  returning_medium: ["한동안 없었어. 도쿄는 크게 안 변했어.", "도시가 기다리고 있었어.", "이번엔 좀 길었어."],
  returning_long:   ["오랜만에 돌아왔어.", "한동안 없었어. 도시는 여전히 조용해.", "돌아왔어. 그것만으로도 뭔가야."],
  fallback: ["도쿄엔 아직 보지 못한 방이 있어.", "오늘 밤 작은 것 하나.", "도시는 아직 거기 있어."],
};

const LOCALE_NUDGE_POOLS: Record<string, LocaleNudgePool> = {
  ja:      NUDGE_JA,
  "zh-TW": NUDGE_ZH_TW,
  ko:      NUDGE_KO,
};

function getLocalizedNudge(
  period:    AtmospherePeriod,
  condition: WeatherCondition,
  chapter:   TokyoChapter | undefined,
  returning: boolean | undefined,
  gapDays:   number | undefined,
  seed:      number,
  locale:    string,
): string | null {
  const pool = LOCALE_NUDGE_POOLS[locale];
  if (!pool) return null;

  if (returning) {
    const days = gapDays ?? 0;
    if (days >= 30) return pick(pool.returning_long, seed);
    if (days >= 14) return pick(pool.returning_medium, seed);
    return pick(pool.returning_short, seed);
  }

  if (chapter) {
    const chapterPool = pool[chapter as keyof LocaleNudgePool] as NudgeLine[] | undefined;
    if (Array.isArray(chapterPool)) {
      const result = fromPool(chapterPool, period, condition, seed);
      if (result) return result;
    }
  }

  return pool.fallback.length > 0 ? pick(pool.fallback, seed) : null;
}

export function getDailyNudge(
  period:     AtmospherePeriod,
  condition:  WeatherCondition,
  chapter?:   TokyoChapter,
  returning?: boolean,
  gapDays?:   number,
  locale?:    string,
): string | null {
  const seed = dailySeed();

  // Non-English: use locale-specific pools; return null if no match
  if (locale && locale !== "en") {
    return getLocalizedNudge(period, condition, chapter, returning, gapDays, seed, locale);
  }

  // Return recognition takes priority on the day of return
  if (returning) {
    const days = gapDays ?? 0;
    if (days >= 30) return pick(RETURN_LONG, seed);
    if (days >= 14) return pick(RETURN_MEDIUM, seed);
    return pick(RETURN_SHORT, seed);
  }

  // Chapter-specific nudge
  if (chapter) {
    const chapterLine = fromPool(CHAPTER_NUDGES[chapter], period, condition, seed);
    if (chapterLine) return chapterLine;
  }

  // Generic period × weather fallback
  const periodNudges = NUDGES[period];
  if (periodNudges) {
    const bucket = periodNudges[condition] ?? periodNudges.any;
    if (bucket && bucket.length > 0) return pick(bucket, seed);
  }

  return pick(FALLBACK, seed);
}
