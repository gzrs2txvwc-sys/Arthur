const ARCHIVE_KEY = "ma_memory_archive_v1";

export interface ArchiveEntry {
  pinId: string;
  collectedAt: string; // ISO timestamp
  city: string;
  title: string;
  category: string;
}

export function getArchive(): ArchiveEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ARCHIVE_KEY) ?? "[]") as ArchiveEntry[];
  } catch {
    return [];
  }
}

export function addToArchive(entry: ArchiveEntry): void {
  const archive = getArchive();
  if (!archive.some((e) => e.pinId === entry.pinId)) {
    archive.push(entry);
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
  }
}

export function clearArchive(): void {
  localStorage.removeItem(ARCHIVE_KEY);
}
