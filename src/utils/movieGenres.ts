import i18n from "../i18n";

export function formatMovieSubtitle(genreIds: number[] | undefined, releaseDate: string | undefined): string {
  const year = releaseDate?.slice(0, 4);
  const gid = genreIds?.[0];
  const genre = gid != null ? i18n.t(`genres.${gid}` as never) : undefined;
  if (genre && year) return `${genre} • ${year}`;
  if (genre) return genre;
  if (year) return year;
  return "";
}
