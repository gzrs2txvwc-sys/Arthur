// Week-aware long-stay content — surface after the user has been here a few days.
// Keyed to anchor answer + elapsed days. Never shown to new visitors.

import type { AnchorAnswer } from "./tokyoRelationship";

type LocaleGroup = "en" | "ja" | "zh";

type Bucket = "week1" | "week2" | "week3" | "week4" | "week6" | "week8" | "month3";

interface WeekNote {
  en: string;
  ja: string;
  zh: string;
}

function bucket(days: number): Bucket {
  if (days < 7)   return "week1";
  if (days < 14)  return "week2";
  if (days < 21)  return "week3";
  if (days < 28)  return "week4";
  if (days < 56)  return "week6";
  if (days < 90)  return "week8";
  return "month3";
}

const ANCHORED: Record<AnchorAnswer, Record<Bucket, WeekNote>> = {
  "just-arrived": {
    week1: {
      en: "Week 1. Everything is still slightly unfamiliar.",
      ja: "1週間目。まだ少し馴染んでいない。",
      zh: "第一週。一切還是有些陌生。",
    },
    week2: {
      en: "Week 2. You're starting to have a route.",
      ja: "2週間目。自分のルートができてきた。",
      zh: "第二週。你開始有了自己的路線。",
    },
    week3: {
      en: "Week 3. You know which konbini to go to.",
      ja: "3週間目。どのコンビニに行くかわかってきた。",
      zh: "第三週。你已經知道要去哪家便利商店了。",
    },
    week4: {
      en: "Week 4. It's getting harder to remember what foreign felt like.",
      ja: "4週間目。異国にいると感じていた頃が遠くなってきた。",
      zh: "第四週。越來越難記得陌生感是什麼感覺了。",
    },
    week6: {
      en: "Month 2. You're not new here anymore.",
      ja: "2ヶ月目。もう新参者じゃない。",
      zh: "第二個月。你不再是新來的了。",
    },
    week8: {
      en: "Two months in. You know which train car to board.",
      ja: "2ヶ月が経った。どの車両に乗るかもわかっている。",
      zh: "兩個月了。你知道該搭哪節車廂了。",
    },
    month3: {
      en: "Three months. You've stopped explaining where you are to people back home.",
      ja: "3ヶ月。故郷の人に居場所を説明するのをやめた。",
      zh: "三個月了。你已經不再向家鄉的人解釋你在哪裡了。",
    },
  },
  "finding-way": {
    week1: {
      en: "Still finding it.",
      ja: "まだ探している途中。",
      zh: "還在摸索中。",
    },
    week2: {
      en: "Week 2. It gets clearer.",
      ja: "2週間目。だんだんはっきりしてくる。",
      zh: "第二週。越來越清晰了。",
    },
    week3: {
      en: "Week 3. You've started noticing things you walk past every day.",
      ja: "3週間目。毎日通り過ぎるものに気づき始めた。",
      zh: "第三週。你開始注意到每天路過的事物。",
    },
    week4: {
      en: "Week 4. The way is getting found.",
      ja: "4週間目。道が見えてきた。",
      zh: "第四週。路越來越清晰了。",
    },
    week6: {
      en: "Month 2. You've found it.",
      ja: "2ヶ月目。見つかった。",
      zh: "第二個月。你找到了。",
    },
    week8: {
      en: "You've found your way. You know it now.",
      ja: "道が見つかった。もうわかっている。",
      zh: "你找到了路。你現在知道了。",
    },
    month3: {
      en: "Three months in. You're not lost anymore.",
      ja: "3ヶ月が経った。もう迷子じゃない。",
      zh: "三個月了。你不再迷路了。",
    },
  },
  "starting-to-feel": {
    week1: {
      en: "Starting to feel it.",
      ja: "感じ始めている。",
      zh: "開始感受到了。",
    },
    week2: {
      en: "Week 2. The feeling is getting stronger.",
      ja: "2週間目。感覚が強まってきた。",
      zh: "第二週。這種感覺越來越強了。",
    },
    week3: {
      en: "Week 3. You have favorites now.",
      ja: "3週間目。お気に入りの場所ができた。",
      zh: "第三週。你現在有了自己喜歡的地方。",
    },
    week4: {
      en: "Month 1. You feel it.",
      ja: "1ヶ月目。感じている。",
      zh: "第一個月。你感受到了。",
    },
    week6: {
      en: "Month 2. The city is starting to feel like yours.",
      ja: "2ヶ月目。この街が自分のものになってきた。",
      zh: "第二個月。這座城市開始感覺像是你的了。",
    },
    week8: {
      en: "You've been feeling at home for a while now.",
      ja: "しばらく前から、ここに馴染んでいる。",
      zh: "你已經感受到家的感覺有一段時間了。",
    },
    month3: {
      en: "Three months of feeling at home. It shows.",
      ja: "3ヶ月、居場所を感じている。それが伝わる。",
      zh: "感受到家的感覺已三個月。這看得出來。",
    },
  },
  "already-home": {
    week1: {
      en: "Welcome back.",
      ja: "おかえり。",
      zh: "歡迎回來。",
    },
    week2: {
      en: "Week 2 back. It's good to be home.",
      ja: "戻って2週間目。家はいいものだ。",
      zh: "回來第二週。在家的感覺真好。",
    },
    week3: {
      en: "Three weeks back. The rhythm returns.",
      ja: "3週間が経った。リズムが戻ってきた。",
      zh: "回來三週了。節奏回來了。",
    },
    week4: {
      en: "A month back. You're in it.",
      ja: "戻って1ヶ月。もう馴染んでいる。",
      zh: "回來一個月了。你融入其中了。",
    },
    week6: {
      en: "Two months home. This city knows you.",
      ja: "家に戻って2ヶ月。この街があなたを知っている。",
      zh: "在家兩個月了。這座城市認識你了。",
    },
    week8: {
      en: "Home for a while now. The feeling is settled.",
      ja: "しばらく家にいる。落ち着いた感覚だ。",
      zh: "在家已有一段時間了。這種感覺已經沉澱了。",
    },
    month3: {
      en: "Three months home. You can stop counting.",
      ja: "3ヶ月が経った。もう数えなくていい。",
      zh: "在家三個月了。你可以不用再計算了。",
    },
  },
};

const GENERIC: Record<Bucket, WeekNote> = {
  week1: { en: "Week 1 in Tokyo.", ja: "東京での1週間目。", zh: "在東京的第一週。" },
  week2: { en: "Week 2.", ja: "2週間目。", zh: "第二週。" },
  week3: {
    en: "Week 3. The unfamiliar is becoming familiar.",
    ja: "3週間目。慣れないものが、慣れてきた。",
    zh: "第三週。陌生的事物開始變得熟悉了。",
  },
  week4: { en: "Month 1.", ja: "1ヶ月目。", zh: "第一個月。" },
  week6: {
    en: "Month 2. You know this city differently now.",
    ja: "2ヶ月目。この街を違う形で知っている。",
    zh: "第二個月。你對這座城市有了不同的了解。",
  },
  week8: { en: "Two months in Tokyo.", ja: "東京に2ヶ月。", zh: "在東京兩個月了。" },
  month3: { en: "Three months. It's yours.", ja: "3ヶ月。あなたの街だ。", zh: "三個月了。這是你的城市。" },
};

export function getWeekNote(
  anchorAnswer: AnchorAnswer | null,
  firstSeenAt: number,
  g: LocaleGroup,
): string | null {
  const days = Math.floor((Date.now() - firstSeenAt) / 86_400_000);
  if (days < 3) return null;

  const b = bucket(days);

  if (anchorAnswer) {
    const note = ANCHORED[anchorAnswer]?.[b];
    if (!note) return null;
    return g === "ja" ? note.ja : g === "zh" ? note.zh : note.en;
  }

  // No anchor — only show generic from week 2 onward
  if (days < 7) return null;
  const note = GENERIC[b];
  if (!note) return null;
  return g === "ja" ? note.ja : g === "zh" ? note.zh : note.en;
}
