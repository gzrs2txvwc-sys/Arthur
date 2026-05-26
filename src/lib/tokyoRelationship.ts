// All functions require a browser environment — safe to import server-side,
// but read/write functions return safe defaults when window is undefined.

const KEY = "tokyo_relationship_v1";

// Three hours of inactivity = a new session; seven days = a disappearance
const NEW_SESSION_MS    = 3  * 60 * 60 * 1000;
const DISAPPEARANCE_MS  = 7  * 24 * 60 * 60 * 1000;

export type TokyoChapter = "arriving" | "adjusting" | "feeling" | "belonging" | "home";
export type AnchorAnswer = "just-arrived" | "finding-way" | "starting-to-feel" | "already-home";

interface RelationshipData {
  chapter:             TokyoChapter;
  anchorAnswer:        AnchorAnswer | null;
  anchorState:         "unseen" | "answered" | "dismissed";
  firstSeenAt:         number;
  lastSeenAt:          number;
  sessionCount:        number;
  longestGapDays:      number;
  disappearanceCount:  number;
  neighborhoodVisits:  Record<string, number>;
  returningFromGap:    boolean;
  currentGapDays:      number;
}

// ── Persistence ────────────────────────────────────────────────────────────

function load(): RelationshipData {
  if (typeof window === "undefined") return blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    return JSON.parse(raw) as RelationshipData;
  } catch {
    return blank();
  }
}

function save(data: RelationshipData): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}

function blank(): RelationshipData {
  return {
    chapter:            "arriving",
    anchorAnswer:       null,
    anchorState:        "unseen",
    firstSeenAt:        Date.now(),
    lastSeenAt:         0,
    sessionCount:       0,
    longestGapDays:     0,
    disappearanceCount: 0,
    neighborhoodVisits: {},
    returningFromGap:   false,
    currentGapDays:     0,
  };
}

// ── Chapter inference ──────────────────────────────────────────────────────
// Invisible — the chapter is never surfaced to the user.
// Anchor establishes a floor; behavioral signals can only push it forward.

const CHAPTER_ORDER: TokyoChapter[] = [
  "arriving", "adjusting", "feeling", "belonging", "home",
];

function infer(data: RelationshipData): TokyoChapter {
  const { anchorAnswer, sessionCount, disappearanceCount, neighborhoodVisits, firstSeenAt } = data;

  const uniqueNeighborhoods = Object.keys(neighborhoodVisits).length;
  const totalVisits = Object.values(neighborhoodVisits).reduce((s, v) => s + v, 0);
  // Depth ratio: > 1.0 means returning to some neighborhoods, > 2.5 means clear favorites
  const depthRatio = uniqueNeighborhoods > 0 ? totalVisits / uniqueNeighborhoods : 0;
  const daysSinceFirst = (Date.now() - firstSeenAt) / 86_400_000;

  // Anchor establishes the floor — the chapter cannot go below where the user placed themselves
  let floor = 0;
  if (anchorAnswer === "finding-way")       floor = 1;
  if (anchorAnswer === "starting-to-feel")  floor = 2;
  if (anchorAnswer === "already-home")      floor = 3;

  let idx = floor;

  if (!anchorAnswer) {
    // Pure behavioral inference — lean conservative (better to speak in the wrong-but-gentler register)
    if (sessionCount >= 6  && depthRatio >= 1.2)                                  idx = Math.max(idx, 1);
    if (sessionCount >= 18 && depthRatio >= 1.8  && disappearanceCount <= 2)      idx = Math.max(idx, 2);
    if (sessionCount >= 40 && depthRatio >= 2.5  && daysSinceFirst >= 150)        idx = Math.max(idx, 3);
    if (sessionCount >= 80 && depthRatio >= 3.0  && daysSinceFirst >= 365)        idx = Math.max(idx, 4);
  } else {
    // Anchor-calibrated: behavioral signals advance from the established floor
    if (sessionCount >= 10 && depthRatio >= 1.5) idx = Math.max(idx, Math.min(floor + 1, 2));
    if (sessionCount >= 28 && depthRatio >= 2.0) idx = Math.max(idx, Math.min(floor + 1, 3));
    if (sessionCount >= 65 && daysSinceFirst >= 150) idx = Math.max(idx, Math.min(floor + 1, 4));
  }

  // Repeated disappearances signal sustained difficulty — resist advancing
  if (disappearanceCount >= 3 && idx > floor) idx = Math.max(floor, idx - 1);

  return CHAPTER_ORDER[Math.min(idx, 4)];
}

// ── Public API ─────────────────────────────────────────────────────────────

// Call on every page mount. Safe to call multiple times per session — after
// the first call the session gap will be below NEW_SESSION_MS, so subsequent
// calls are no-ops. Returns whether this counts as a new session / return.
export function touchSession(): { isNew: boolean; isReturn: boolean; gapDays: number } {
  const data = load();
  const now  = Date.now();

  // Very first session ever
  if (data.sessionCount === 0) {
    const init = { ...data, firstSeenAt: now, lastSeenAt: now, sessionCount: 1 };
    init.chapter = infer(init);
    save(init);
    return { isNew: true, isReturn: false, gapDays: 0 };
  }

  const gap        = now - data.lastSeenAt;
  const gapDays    = gap / 86_400_000;
  const isNew      = gap >= NEW_SESSION_MS;
  const isReturn   = gap >= DISAPPEARANCE_MS;

  if (!isNew) return { isNew: false, isReturn: false, gapDays: 0 };

  const updated: RelationshipData = {
    ...data,
    lastSeenAt:         now,
    sessionCount:       data.sessionCount + 1,
    longestGapDays:     isReturn ? Math.max(data.longestGapDays, gapDays) : data.longestGapDays,
    disappearanceCount: isReturn ? data.disappearanceCount + 1 : data.disappearanceCount,
    returningFromGap:   isReturn,
    currentGapDays:     isReturn ? gapDays : 0,
  };
  updated.chapter = infer(updated);
  save(updated);

  return { isNew: true, isReturn, gapDays: isReturn ? gapDays : 0 };
}

// Called from visitLog when a postcard is viewed — keeps neighborhood
// data in sync without the relationship store depending on visitLog internals.
export function recordNeighborhoodVisit(neighborhood: string): void {
  const data = load();
  const nv = { ...data.neighborhoodVisits };
  nv[neighborhood] = (nv[neighborhood] ?? 0) + 1;
  const updated = { ...data, neighborhoodVisits: nv };
  updated.chapter = infer(updated);
  save(updated);
}

// Public read — for taste and identity systems (client-only)
export function readRelationshipStore(): RelationshipData {
  return load();
}

// The current chapter — drives nudge tone, observation register, etc.
// Never shown to the user directly.
export function getChapter(): TokyoChapter {
  return load().chapter;
}

// Returns true once the anchor question should appear (after session 2),
// false once it has been answered or dismissed.
export function shouldShowAnchor(): boolean {
  const data = load();
  return data.sessionCount >= 2 && data.anchorState === "unseen";
}

export function setAnchorAnswer(answer: AnchorAnswer): void {
  const data = load();
  const updated = { ...data, anchorAnswer: answer, anchorState: "answered" as const };
  updated.chapter = infer(updated);
  save(updated);
}

export function dismissAnchor(): void {
  const data = load();
  save({ ...data, anchorState: "dismissed" });
}

// Consume the return signal — returns true once per gap event, then resets.
// The return state is intentionally one-shot so the platform acknowledges it
// exactly once rather than repeatedly.
export function consumeReturnSignal(): { returning: boolean; gapDays: number } {
  const data = load();
  if (!data.returningFromGap) return { returning: false, gapDays: 0 };
  save({ ...data, returningFromGap: false });
  return { returning: true, gapDays: data.currentGapDays };
}
