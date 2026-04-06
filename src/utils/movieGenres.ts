const GENRE_ID_TO_LABEL: Record<number, string> = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "TV",
  53: "Suspenso",
  10752: "Bélica",
  37: "Western",
};

export function formatMovieSubtitle(genreIds: number[] | undefined, releaseDate: string | undefined): string {
  const year = releaseDate?.slice(0, 4);
  const gid = genreIds?.[0];
  const genre = gid != null ? GENRE_ID_TO_LABEL[gid] : undefined;
  if (genre && year) return `${genre} • ${year}`;
  if (genre) return genre;
  if (year) return year;
  return "";
}
