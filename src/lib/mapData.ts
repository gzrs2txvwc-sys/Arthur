// Central re-export hub — all map imports come through here
export type {
  MemoryPostcard,
  FragmentMood,
  FragmentWeather,
  TimeOfDay,
  Season,
  UrbanFragmentType,
  PinState,
} from "./postcards";

export { moodMeta } from "./postcards";
export { memoryPostcards } from "./postcardData";

export const mapCenter: [number, number] = [36.5, 137.5];
export const mapDefaultZoom = 6;
