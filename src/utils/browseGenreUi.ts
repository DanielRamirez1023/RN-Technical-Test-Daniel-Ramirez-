import { CINEMA } from "./cinemaTheme";

const GENRE_TILE_BACKGROUNDS = [
  "#2a1a1f",
  "#1a2228",
  "#1f2418",
  "#221a2e",
  "#1a2824",
  "#2e2218",
  "#1c1c2e",
];

export function genreTileBackground(genreId: number): string {
  const i = Math.abs(genreId) % GENRE_TILE_BACKGROUNDS.length;
  return GENRE_TILE_BACKGROUNDS[i];
}

const GENRE_ICONS: Record<number, string> = {
  28: "flash",
  12: "compass",
  16: "color-palette",
  35: "happy-outline",
  80: "finger-print",
  99: "document-text-outline",
  18: "people-outline",
  10751: "home-outline",
  14: "planet-outline",
  36: "library-outline",
  27: "skull-outline",
  10402: "musical-notes",
  9648: "search-outline",
  10749: "heart-outline",
  878: "rocket-outline",
  10770: "tv-outline",
  53: "eye-outline",
  10752: "shield-outline",
  37: "sunny-outline",
};

export function genreRowIcon(genreId: number): string {
  return GENRE_ICONS[genreId] ?? "film-outline";
}

const ROW_ICON_COLORS: Record<number, string> = {
  10402: "#E50914",
  36: "#c9a227",
  53: "#7c6cf0",
};

export function genreRowIconTint(genreId: number): string {
  return ROW_ICON_COLORS[genreId] ?? CINEMA.textMuted;
}
