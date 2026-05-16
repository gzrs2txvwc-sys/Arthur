import type { PinState } from "@/lib/mapData";

export const UNLOCK_RADIUS = 150; // meters — within this, memory can be unlocked
export const NEARBY_RADIUS = 600; // meters — within this, pin shows as "nearby"

export function haversineDistance(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number]
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getPinState(
  userPosition: [number, number] | null,
  pinCoords: [number, number],
  collected: boolean,
  unlockRadius = UNLOCK_RADIUS
): PinState {
  if (collected) return "collected";
  if (!userPosition) return "locked";
  const dist = haversineDistance(userPosition, pinCoords);
  if (dist <= unlockRadius) return "unlocked";
  if (dist <= NEARBY_RADIUS) return "nearby";
  return "locked";
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)}km`;
  return `${Math.round(meters)}m`;
}
