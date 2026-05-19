import type { WeatherCondition } from "./weather";
import type { AtmospherePeriod } from "./atmosphere";

type DayType = "weekday" | "friday" | "saturday" | "sunday";

interface ObservationLine {
  periods?:    AtmospherePeriod[];
  conditions?: WeatherCondition[];
  days?:       DayType[];
  text:        string;
}

// ── English ─────────────────────────────────────────────────────────────────
const LINES_EN: ObservationLine[] = [
  // Latenight
  { periods: ["latenight"], conditions: ["rainy"],
    text: "The kind of rain that makes konbini lighting look warmer than usual." },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "Someone didn't make the last train. They're figuring it out." },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "At this hour the streets belong to people who didn't plan on being out." },
  { periods: ["latenight"], days: ["sunday"],
    text: "Sunday night here has a particular kind of weight." },
  { periods: ["latenight"], days: ["friday", "saturday"],
    text: "The people who know where they're going are still out." },
  { periods: ["latenight"],
    text: "Tonight someone in Nakano waited past the last train." },
  { periods: ["latenight"],
    text: "The vending machine on the corner is the only warm light on this block." },
  { periods: ["latenight"],
    text: "A convenience store is always open. You probably already knew that." },
  { periods: ["latenight"],
    text: "After midnight, Tokyo is still making noise somewhere." },

  // Dawn
  { periods: ["dawn"], conditions: ["rainy"],
    text: "Rain before the city wakes up." },
  { periods: ["dawn"],
    text: "Before 6am, the city runs on maintenance crews and early bakers." },
  { periods: ["dawn"],
    text: "The first train carries people who slept somewhere they didn't plan to." },
  { periods: ["dawn"],
    text: "Tokyo is very quiet before 6am. It won't be for long." },

  // Morning
  { periods: ["morning"], conditions: ["rainy"],
    text: "A konbini umbrella costs 500 yen. Everyone has forgotten one before." },
  { periods: ["morning"], conditions: ["rainy"],
    text: "Rain before 9am makes people a little more patient at the crosswalk." },
  { periods: ["morning"], days: ["saturday"],
    text: "Saturday mornings move slower. The city cooperates." },
  { periods: ["morning"], days: ["sunday"],
    text: "The cafes fill up an hour later on Sundays." },
  { periods: ["morning"], days: ["weekday", "friday"],
    text: "The morning trains are full of people going somewhere decided." },
  { periods: ["morning"],
    text: "Mornings here arrive early and don't apologize for it." },

  // Daytime
  { periods: ["daytime"], conditions: ["rainy"],
    text: "Rainy weekday afternoons belong to people with nowhere they have to be." },
  { periods: ["daytime"], conditions: ["rainy"],
    text: "The covered walkways between buildings have a rhythm to them in rain." },
  { periods: ["daytime"], conditions: ["clear"],
    text: "Clear days in Tokyo feel like the city is cooperating." },
  { periods: ["daytime"],
    text: "Somewhere in this city, someone is eating alone and that's fine." },
  { periods: ["daytime"],
    text: "Afternoon is when Tokyo asks the least of you." },

  // Sunset / Evening
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "Rain in the evening makes the city feel smaller and easier." },
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "The wet streets reflect the signs. It's a slightly different city tonight." },
  { periods: ["sunset", "evening"], days: ["friday"],
    text: "Friday evening in Tokyo has its own particular energy." },
  { periods: ["sunset", "evening"], days: ["sunday"],
    text: "Sunday evening and the city is already thinking about tomorrow." },
  { periods: ["sunset", "evening"],
    text: "After 6pm the city becomes a slightly different city." },
  { periods: ["sunset", "evening"],
    text: "There's a moment around 7pm when the trains switch from crowded to possible." },

  // Night
  { periods: ["night"], conditions: ["rainy"],
    text: "A wet night. The alley lights reflect off the pavement." },
  { periods: ["night"], conditions: ["rainy"],
    text: "There's a shop in Shimokitazawa that's still lit tonight." },
  { periods: ["night"], days: ["sunday"],
    text: "Sunday night has its own particular silence." },
  { periods: ["night"], days: ["friday", "saturday"],
    text: "On Friday nights, the city gives itself permission." },
  { periods: ["night"],
    text: "The city has more rooms than most people ever find." },
  { periods: ["night"],
    text: "Some people have a corner of this city that belongs only to them." },
  { periods: ["night"],
    text: "Tonight someone decided to stay out one more hour." },

  // Universal
  { text: "Convenience stores look warmer in winter." },
  { text: "Some people arrive in Tokyo without knowing how long they'll stay." },
  { text: "The city has a way of becoming familiar without asking permission." },
  { text: "Some things here only make sense on the third time." },
  { text: "There's always a part of this city you haven't walked through yet." },
];

// ── Japanese ─────────────────────────────────────────────────────────────────
const LINES_JA: ObservationLine[] = [
  // Latenight
  { periods: ["latenight"], conditions: ["rainy"],
    text: "コンビニの光が、雨のせいでいつもより温かく見える。" },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "終電を逃した誰かが、今夜の算段をしている。" },
  { periods: ["latenight"], days: ["sunday"],
    text: "日曜の夜はここでも重い。" },
  { periods: ["latenight"], days: ["friday", "saturday"],
    text: "行き先を知っている人たちは、まだ外にいる。" },
  { periods: ["latenight"],
    text: "自動販売機だけが、この通りで光っている。" },
  { periods: ["latenight"],
    text: "深夜でも、東京のどこかは音を立てている。" },

  // Dawn
  { periods: ["dawn"], conditions: ["rainy"],
    text: "街が目を覚ます前の、雨。" },
  { periods: ["dawn"],
    text: "最初の電車が来る前、東京はまだ誰のものでもない。" },
  { periods: ["dawn"],
    text: "6時前の静けさは、長くは続かない。" },

  // Morning
  { periods: ["morning"], conditions: ["rainy"],
    text: "コンビニの傘が500円。どこかに忘れてきたことのある人が多い。" },
  { periods: ["morning"], days: ["saturday"],
    text: "土曜の朝はゆっくり動く。街もそれに付き合ってくれる。" },
  { periods: ["morning"], days: ["sunday"],
    text: "日曜のカフェは、一時間遅れで埋まっていく。" },
  { periods: ["morning"], days: ["weekday", "friday"],
    text: "朝の電車は、行き先を決めた人たちで満ちている。" },
  { periods: ["morning"],
    text: "朝はここでは早く来て、謝らずに過ぎていく。" },

  // Daytime
  { periods: ["daytime"], conditions: ["rainy"],
    text: "雨の平日の午後は、急ぐ必要のない人たちのものだ。" },
  { periods: ["daytime"], conditions: ["clear"],
    text: "晴れた日の東京は、街が協力してくれている気がする。" },
  { periods: ["daytime"],
    text: "どこかで誰かが一人で食事をしていて、それでいい。" },
  { periods: ["daytime"],
    text: "午後は東京が、あまり何も求めてこない時間だ。" },

  // Sunset / Evening
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "夜雨は街を、少し小さく、少し易しくする。" },
  { periods: ["sunset", "evening"], days: ["friday"],
    text: "金曜の夕方には、独特のエネルギーがある。" },
  { periods: ["sunset", "evening"], days: ["sunday"],
    text: "日曜の夕方、街はもう明日のことを考えている。" },
  { periods: ["sunset", "evening"],
    text: "夜7時ごろ、電車が混雑から乗れる状態に変わる瞬間がある。" },

  // Night
  { periods: ["night"], conditions: ["rainy"],
    text: "濡れた夜。路地の灯りが路面に映っている。" },
  { periods: ["night"], days: ["sunday"],
    text: "日曜の夜には、独特の静けさがある。" },
  { periods: ["night"], days: ["friday", "saturday"],
    text: "金曜の夜、街は自分に許可を与える。" },
  { periods: ["night"],
    text: "この街には、ほとんどの人が辿り着かない部屋がある。" },

  // Universal
  { text: "冬のコンビニは、なぜか少し温かく見える。" },
  { text: "東京に来た人の中には、どれくらい居るか知らずに来た人もいる。" },
  { text: "この街は、許可を求めずに馴染みになっていく。" },
  { text: "まだ歩いたことのない路地が、必ずある。" },
];

// ── Traditional Chinese ───────────────────────────────────────────────────────
const LINES_ZH_TW: ObservationLine[] = [
  // Latenight
  { periods: ["latenight"], conditions: ["rainy"],
    text: "這種雨，讓便利商店的燈光看起來比平常溫暖一點。" },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "有人沒趕上末班車，現在正在想辦法。" },
  { periods: ["latenight"], days: ["sunday"],
    text: "在這裡，日曜日深夜也有它自己的重量。" },
  { periods: ["latenight"], days: ["friday", "saturday"],
    text: "知道自己要去哪裡的人，還在外面。" },
  { periods: ["latenight"],
    text: "這條街上，只剩自動販賣機還亮著。" },
  { periods: ["latenight"],
    text: "深夜了，東京的某個角落仍然在動。" },

  // Dawn
  { periods: ["dawn"], conditions: ["rainy"],
    text: "城市醒來之前的雨。" },
  { periods: ["dawn"],
    text: "第一班電車來之前，東京還不屬於任何人。" },
  { periods: ["dawn"],
    text: "清晨六點前的安靜不會太久。" },

  // Morning
  { periods: ["morning"], conditions: ["rainy"],
    text: "便利商店的傘五百日圓。大家都忘記帶過一次。" },
  { periods: ["morning"], days: ["saturday"],
    text: "週六早上走得慢一點。城市也配合著你。" },
  { periods: ["morning"], days: ["sunday"],
    text: "週日的咖啡廳，晚一個小時才開始坐滿。" },
  { periods: ["morning"], days: ["weekday", "friday"],
    text: "早上的電車裝滿了知道自己要去哪裡的人。" },
  { periods: ["morning"],
    text: "早晨在這裡來得早，走得也不客氣。" },

  // Daytime
  { periods: ["daytime"], conditions: ["rainy"],
    text: "雨天的週間午後，屬於那些不急著去哪裡的人。" },
  { periods: ["daytime"], conditions: ["clear"],
    text: "晴天的東京感覺像是城市在配合你。" },
  { periods: ["daytime"],
    text: "城市的某個角落，有人在一個人吃飯，也沒什麼不好。" },
  { periods: ["daytime"],
    text: "下午是東京對你要求最少的時間。" },

  // Sunset / Evening
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "傍晚的雨讓城市變得小一點，輕鬆一點。" },
  { periods: ["sunset", "evening"], days: ["friday"],
    text: "週五傍晚的東京有它自己的節奏。" },
  { periods: ["sunset", "evening"], days: ["sunday"],
    text: "週日傍晚，城市已經在想明天的事了。" },
  { periods: ["sunset", "evening"],
    text: "晚上七點左右，電車從擠不進去變成可以了。" },

  // Night
  { periods: ["night"], conditions: ["rainy"],
    text: "濕的夜晚。小巷的燈光倒映在路面上。" },
  { periods: ["night"], days: ["sunday"],
    text: "週日夜晚有它特有的安靜。" },
  { periods: ["night"], days: ["friday", "saturday"],
    text: "週五夜晚，城市允許自己放鬆。" },
  { periods: ["night"],
    text: "這座城市有很多房間，大多數人從未找到。" },

  // Universal
  { text: "便利商店在冬天看起來比較溫暖。" },
  { text: "有些人來到東京，不知道自己會待多久。" },
  { text: "這座城市習慣讓人熟悉，不需要你的允許。" },
  { text: "總有一條巷子還沒走過。" },
];

// ── Korean ───────────────────────────────────────────────────────────────────
const LINES_KO: ObservationLine[] = [
  // Latenight
  { periods: ["latenight"], conditions: ["rainy"],
    text: "이런 비는 편의점 불빛을 평소보다 더 따뜻하게 만들어." },
  { periods: ["latenight"], conditions: ["rainy"],
    text: "막차를 못 탄 누군가가 지금 어떻게 할지 생각 중이야." },
  { periods: ["latenight"], days: ["sunday"],
    text: "일요일 밤은 여기서도 그 나름의 무게가 있어." },
  { periods: ["latenight"], days: ["friday", "saturday"],
    text: "갈 곳을 아는 사람들은 아직 밖에 있어." },
  { periods: ["latenight"],
    text: "이 거리에서 불이 켜져 있는 건 자판기뿐이야." },
  { periods: ["latenight"],
    text: "자정이 지나도 도쿄 어딘가는 아직 움직이고 있어." },

  // Dawn
  { periods: ["dawn"], conditions: ["rainy"],
    text: "도시가 깨어나기 전의 비." },
  { periods: ["dawn"],
    text: "첫 전철이 오기 전, 도쿄는 아직 아무의 것도 아니야." },
  { periods: ["dawn"],
    text: "여섯 시 전의 고요함은 오래 가지 않아." },

  // Morning
  { periods: ["morning"], conditions: ["rainy"],
    text: "편의점 우산이 오백 엔. 한 번쯤 어디 두고 온 사람이 많아." },
  { periods: ["morning"], days: ["saturday"],
    text: "토요일 아침은 천천히 흘러. 도시도 그걸 알아." },
  { periods: ["morning"], days: ["sunday"],
    text: "일요일엔 카페가 한 시간 늦게 차기 시작해." },
  { periods: ["morning"], days: ["weekday", "friday"],
    text: "아침 전철엔 갈 곳이 정해진 사람들로 가득해." },
  { periods: ["morning"],
    text: "아침은 여기서 일찍 오고, 미안하다는 말 없이 지나가." },

  // Daytime
  { periods: ["daytime"], conditions: ["rainy"],
    text: "비 오는 평일 오후는 서두를 이유가 없는 사람들 몫이야." },
  { periods: ["daytime"], conditions: ["clear"],
    text: "맑은 날의 도쿄는 도시가 협조해 주는 느낌이야." },
  { periods: ["daytime"],
    text: "어딘가에서 혼자 밥 먹는 사람이 있고, 그래도 괜찮아." },
  { periods: ["daytime"],
    text: "오후는 도쿄가 당신에게 가장 적게 요구하는 시간이야." },

  // Sunset / Evening
  { periods: ["sunset", "evening"], conditions: ["rainy"],
    text: "저녁 비는 도시를 조금 더 작고 편안하게 만들어." },
  { periods: ["sunset", "evening"], days: ["friday"],
    text: "금요일 저녁의 도쿄엔 특유의 에너지가 있어." },
  { periods: ["sunset", "evening"], days: ["sunday"],
    text: "일요일 저녁, 도시는 이미 내일을 생각하고 있어." },
  { periods: ["sunset", "evening"],
    text: "저녁 일곱 시쯤, 전철이 붐비다가 탈 수 있게 되는 순간이 있어." },

  // Night
  { periods: ["night"], conditions: ["rainy"],
    text: "젖은 밤. 골목 불빛이 아스팔트에 반사되고 있어." },
  { periods: ["night"], days: ["sunday"],
    text: "일요일 밤엔 특별한 고요함이 있어." },
  { periods: ["night"], days: ["friday", "saturday"],
    text: "금요일 밤, 도시는 스스로에게 허락을 줘." },
  { periods: ["night"],
    text: "이 도시엔 대부분의 사람이 찾지 못하는 공간들이 있어." },

  // Universal
  { text: "편의점은 겨울에 더 따뜻해 보여." },
  { text: "어떤 사람들은 얼마나 있을지 모르고 도쿄에 왔어." },
  { text: "이 도시는 허락 없이 익숙해지는 방법을 알아." },
  { text: "아직 걷지 않은 골목이 반드시 있어." },
];

const LOCALE_LINES: Record<string, ObservationLine[]> = {
  en:      LINES_EN,
  ja:      LINES_JA,
  "zh-TW": LINES_ZH_TW,
  ko:      LINES_KO,
};

function tokyoDayType(): DayType {
  const ms  = Date.now() + 9 * 3600 * 1000;
  const day = new Date(ms).getUTCDay();
  if (day === 0) return "sunday";
  if (day === 5) return "friday";
  if (day === 6) return "saturday";
  return "weekday";
}

function dailySeed(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / (24 * 3600 * 1000));
}

export function getOpeningLine(
  period:    AtmospherePeriod,
  condition: WeatherCondition,
  locale:    string = "en",
): string {
  const lines = LOCALE_LINES[locale] ?? LINES_EN;
  const day   = tokyoDayType();
  const seed  = dailySeed();

  const scored = lines
    .map((line) => {
      const periodMatch    = !line.periods    || line.periods.includes(period);
      const conditionMatch = !line.conditions || line.conditions.includes(condition);
      const dayMatch       = !line.days       || line.days.includes(day);
      if (!periodMatch || !conditionMatch || !dayMatch) return null;

      const specificity =
        (line.periods    ? 2 : 0) +
        (line.conditions ? 2 : 0) +
        (line.days       ? 1 : 0);

      return { line, specificity };
    })
    .filter(Boolean) as { line: ObservationLine; specificity: number }[];

  if (scored.length === 0) return lines[seed % lines.length].text;

  const maxSpec = Math.max(...scored.map((s) => s.specificity));
  const top     = scored.filter((s) => s.specificity >= maxSpec);
  return top[seed % top.length].line.text;
}
