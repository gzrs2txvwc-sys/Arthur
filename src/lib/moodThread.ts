import type { FragmentMood } from "./postcards";

type Locale = string;

// Which moods flow naturally into which — emotional proximity, not taxonomy
export const MOOD_NEIGHBORS: Record<FragmentMood, FragmentMood[]> = {
  solitude:  ["quiet", "adrift", "invisible", "homesick"],
  quiet:     ["solitude", "anchored", "tender", "adrift"],
  adrift:    ["wandering", "invisible", "homesick", "solitude"],
  homesick:  ["solitude", "tender", "adrift", "quiet"],
  wandering: ["adrift", "restless", "belonging", "quiet"],
  belonging: ["anchored", "tender", "wandering", "quiet"],
  anchored:  ["belonging", "quiet", "tender", "solitude"],
  tender:    ["homesick", "belonging", "quiet", "solitude"],
  restless:  ["wandering", "adrift", "invisible", "solitude"],
  invisible: ["solitude", "adrift", "quiet", "homesick"],
};

// One atmospheric sentence per mood — bridges where you are to what comes next.
// Should feel like a thought, not a label.
export const MOOD_CONNECTOR: Record<FragmentMood, string> = {
  solitude:  "The city carries that feeling in other rooms too.",
  quiet:     "There is more stillness nearby, if you look for it.",
  adrift:    "This feeling moves. It finds you in other places.",
  homesick:  "Distance does something particular at this hour.",
  wandering: "There is always one more street.",
  belonging: "You start to notice things that stay the same.",
  anchored:  "Some places keep you still for a while.",
  tender:    "Small things have weight here.",
  restless:  "The city has edges you haven't reached yet.",
  invisible: "Tokyo runs parallel to its own surface.",
};

// Short second-person lines — the feeling of drifting between spaces
export const DRIFT_LINES: Record<FragmentMood, string[]> = {
  solitude: [
    "It's later than you meant to stay.",
    "The platform is almost empty.",
    "You've stopped expecting company.",
  ],
  quiet: [
    "Something is being held carefully nearby.",
    "Morning hasn't fully arrived yet.",
    "The noise doesn't reach here.",
  ],
  adrift: [
    "You forgot which direction you came from.",
    "The map is no longer helping.",
    "You're somewhere. That's enough.",
  ],
  homesick: [
    "You think about calling. You don't.",
    "The vending machine is the only light.",
    "This specific hour feels too far.",
  ],
  wandering: [
    "There's a side street you haven't tried.",
    "The sign says something you can't read.",
    "You've been going this way for twenty minutes.",
  ],
  belonging: [
    "You stopped checking the map a few weeks ago.",
    "The person at the counter recognized you.",
    "This corner feels like it might be yours.",
  ],
  anchored: [
    "You have a regular hour here.",
    "Saturday morning, always.",
    "This view doesn't need explaining anymore.",
  ],
  tender: [
    "Something small and exact happened near here.",
    "You remember this without knowing why.",
    "It was a Tuesday. Maybe a Thursday.",
  ],
  restless: [
    "The city has another face after midnight.",
    "You left the apartment for no reason.",
    "Waiting, without knowing what for.",
  ],
  invisible: [
    "Nobody noticed you come in. That was good.",
    "You've been sitting here an hour.",
    "The city runs past you, not through you.",
  ],
};

// ── Japanese mood connectors ─────────────────────────────────────────────────
const MOOD_CONNECTOR_JA: Record<FragmentMood, string> = {
  solitude:  "その感覚は、街の別の部屋にも続いている。",
  quiet:     "もっと静かな場所が、すぐそこにある。",
  adrift:    "この気持ちは動く。別の場所でも追いかけてくる。",
  homesick:  "距離は、この時間帯に特別なことをする。",
  wandering: "まだ一本、路地が残っている。",
  belonging: "変わらないものに気づき始める。",
  anchored:  "ある場所は、しばらく動かさずにいてくれる。",
  tender:    "小さなことに、ここでは重さがある。",
  restless:  "街にはまだ、辿り着いていない端がある。",
  invisible: "東京は自分の表面と並行して動いている。",
};

const MOOD_CONNECTOR_ZH_TW: Record<FragmentMood, string> = {
  solitude:  "那種感覺在城市的其他房間也存在。",
  quiet:     "附近還有更安靜的地方，如果你去找的話。",
  adrift:    "這種感覺會移動，它在別的地方也找得到你。",
  homesick:  "在這個時刻，距離有種特別的重量。",
  wandering: "永遠還有下一條巷子。",
  belonging: "你開始注意到那些沒有改變的事物。",
  anchored:  "有些地方讓你停在那裡待一會兒。",
  tender:    "小事情在這裡有它的重量。",
  restless:  "這城市還有你沒到達過的邊緣。",
  invisible: "東京與自己的表面平行運轉。",
};

const MOOD_CONNECTOR_KO: Record<FragmentMood, string> = {
  solitude:  "그 감각은 도시의 다른 방에도 있어.",
  quiet:     "가까이에 더 조용한 곳이 있어, 찾으면 돼.",
  adrift:    "이 감각은 움직여. 다른 곳에서도 따라와.",
  homesick:  "거리는 이 시간에 특별한 무게를 가져.",
  wandering: "항상 한 골목이 더 남아 있어.",
  belonging: "변하지 않는 것들이 눈에 들어오기 시작해.",
  anchored:  "어떤 곳은 잠시 당신을 멈추게 해.",
  tender:    "작은 것들이 여기선 무게가 있어.",
  restless:  "도시엔 아직 가보지 않은 끝이 있어.",
  invisible: "도쿄는 자신의 표면과 평행하게 움직여.",
};

export function getMoodConnector(mood: FragmentMood, locale: Locale = "en"): string {
  if (locale === "ja")      return MOOD_CONNECTOR_JA[mood];
  if (locale === "zh-TW")   return MOOD_CONNECTOR_ZH_TW[mood];
  if (locale === "ko")      return MOOD_CONNECTOR_KO[mood];
  return MOOD_CONNECTOR[mood];
}

// ── Japanese drift lines ──────────────────────────────────────────────────────
const DRIFT_LINES_JA: Record<FragmentMood, string[]> = {
  solitude: ["気づいたら予定より遅くなっていた。", "ホームがほぼ空だ。", "誰かを待つのをやめた。"],
  quiet:    ["近くで何かが大切に保たれている。", "朝はまだ完全には来ていない。", "音がここまで届かない。"],
  adrift:   ["どこから来たか忘れた。", "地図はもう助けてくれない。", "どこかにいる。それでいい。"],
  homesick: ["電話しようと思った。しなかった。", "自動販売機だけが灯っている。", "この時間帯は遠すぎる。"],
  wandering:["まだ試していない路地がある。", "看板が読めない。", "この方向に二十分いる。"],
  belonging:["数週間前から地図を見なくなった。", "カウンターの人が顔を覚えてくれていた。", "この角が、自分のものかもしれない。"],
  anchored: ["ここに来る決まった時間がある。", "土曜の朝、いつも。", "この景色はもう説明しなくていい。"],
  tender:   ["近くで何か小さくて確かなことがあった。", "なぜか覚えている。", "火曜だったか木曜だったか。"],
  restless: ["街は深夜に別の顔を見せる。", "理由もなく部屋を出た。", "何かを待っている、何かはわからないが。"],
  invisible:["入ってきても誰も気づかなかった。よかった。", "もう一時間ここにいる。", "街は自分の横を流れていく。"],
};

const DRIFT_LINES_ZH_TW: Record<FragmentMood, string[]> = {
  solitude: ["待到比預想中晚了。", "月台幾乎空了。", "不再期待有人陪了。"],
  quiet:    ["附近有什麼東西被小心翼翼地保存著。", "早晨還沒完全到來。", "噪音到不了這裡。"],
  adrift:   ["忘了從哪個方向來的。", "地圖已經幫不了忙了。", "在某個地方，這樣就夠了。"],
  homesick: ["想打電話，沒打。", "自動販賣機是唯一的光。", "這個時刻感覺太遠了。"],
  wandering:["還有一條沒試過的小路。", "招牌上的字看不懂。", "已經往這個方向走了二十分鐘了。"],
  belonging:["幾週前就不再看地圖了。", "收銀台的人認出了你。", "這個角落感覺可能是你的了。"],
  anchored: ["這裡有你固定來的時間。", "每個星期六早上。", "這個景色不需要再解釋了。"],
  tender:   ["附近發生了什麼小而確切的事。", "不知道為什麼記得這裡。", "那天是星期二，也許是星期四。"],
  restless: ["深夜後城市換了一張臉。", "沒有理由就出了門。", "在等待，不知道在等什麼。"],
  invisible:["進來了沒有人注意到，這樣很好。", "已經在這裡坐了一個小時。", "城市在你旁邊流過，不穿過你。"],
};

const DRIFT_LINES_KO: Record<FragmentMood, string[]> = {
  solitude: ["생각보다 늦게까지 있었어.", "플랫폼이 거의 비었어.", "누군가를 기다리는 걸 그만뒀어."],
  quiet:    ["가까이에 뭔가 조심스럽게 지켜지고 있어.", "아침이 완전히 오지 않았어.", "소음이 여기까지 닿지 않아."],
  adrift:   ["어디서 왔는지 잊었어.", "지도가 이제 도움이 안 돼.", "어딘가에 있어. 그걸로 충분해."],
  homesick: ["전화하려 했어. 안 했어.", "자판기만 켜져 있어.", "이 시간대가 너무 멀어."],
  wandering:["아직 가보지 않은 골목이 있어.", "간판을 읽을 수 없어.", "이 방향으로 이십 분째야."],
  belonging:["몇 주 전부터 지도를 안 봐.", "카운터 직원이 알아봤어.", "이 모퉁이가 내 것 같은 느낌이야."],
  anchored: ["여기에 오는 정해진 시간이 있어.", "토요일 아침, 항상.", "이 풍경은 더 이상 설명할 필요가 없어."],
  tender:   ["근처에서 작고 정확한 일이 있었어.", "왜 기억나는지 모르겠어.", "화요일이었어. 목요일이었을 수도 있어."],
  restless: ["도시는 자정 이후에 다른 얼굴을 보여.", "이유 없이 나왔어.", "기다리는 중인데, 뭘 기다리는지 몰라."],
  invisible:["들어와도 아무도 몰랐어. 다행이야.", "여기 앉은 지 한 시간이 됐어.", "도시는 나를 통과하지 않고 옆을 흘러가."],
};

export function getDriftLine(mood: FragmentMood, seed = 0, locale: Locale = "en"): string {
  const pool = locale === "ja"      ? DRIFT_LINES_JA
             : locale === "zh-TW"   ? DRIFT_LINES_ZH_TW
             : locale === "ko"      ? DRIFT_LINES_KO
             : DRIFT_LINES;
  const lines = pool[mood] ?? DRIFT_LINES[mood];
  return lines[seed % lines.length];
}

// Emotional adjacency between two moods (0 = unrelated, 3 = same).
// Directional: A→B adjacency may differ from B→A.
export function getMoodAdjacency(moodA: FragmentMood, moodB: FragmentMood): 0 | 1 | 2 | 3 {
  if (moodA === moodB) return 3;
  if (MOOD_NEIGHBORS[moodA].includes(moodB)) return 2;
  if (MOOD_NEIGHBORS[moodB].includes(moodA)) return 1;
  return 0;
}

// Derive a mood from story tags — ordered by specificity
const TAG_MOOD: Record<string, FragmentMood> = {
  solitude:  "solitude",
  "3am":     "solitude",
  midnight:  "tender",
  night:     "solitude",
  rain:      "adrift",
  silence:   "quiet",
  quiet:     "quiet",
  dawn:      "quiet",
  morning:   "quiet",
  temples:   "quiet",
  shrine:    "anchored",
  wandering: "wandering",
  homesick:  "homesick",
  foreign:   "adrift",
  belonging: "belonging",
  warmth:    "tender",
  food:      "tender",
  ramen:     "tender",
  cafe:      "quiet",
  konbini:   "quiet",
  invisible: "invisible",
  restless:  "restless",
};

export function getMoodFromTags(tags: string[]): FragmentMood {
  for (const tag of tags) {
    const m = TAG_MOOD[tag.toLowerCase()];
    if (m) return m;
  }
  return "wandering";
}
