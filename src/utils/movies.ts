import { Movie } from "../types/movies";

export const getImageUrl = (path: string | null | undefined) => (path ? `https://image.tmdb.org/t/p/w500${path}` : "");

export const getBackdropUrl = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w780${path}` : "";

export const getProfileUrl = (path: string | null | undefined) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : "";

/**
 * Deduplicates movies by their id.
 * @param movies - The movies to deduplicate.
 * @returns The deduplicated movies.
 */
export function dedupeMoviesById(movies: Movie[]): Movie[] {
  const byId = new Map<number, Movie>();
  for (const movie of movies) {
    if (!byId.has(movie.id)) {
      byId.set(movie.id, movie);
    }
  }
  return Array.from(byId.values());
}
