import { useState, useMemo } from "react";
import type { Movie } from "../services/movieService";
import { useDebouncedValue } from "./useDebouncedValue";

export const HOME_MOVIE_DETAIL_PIPELINE_LIMIT = 200;

export function useHomeMovieSearch(movies: Movie[]) {
  const [searchLetter, setSearchLetter] = useState("");
  const debouncedSearchLetter = useDebouncedValue(searchLetter, 350);

  const filteredMovies = useMemo(() => {
    const letter = debouncedSearchLetter.toLowerCase();
    if (!letter) return movies;
    return movies.filter((movie) => movie.title.toLowerCase().startsWith(letter));
  }, [movies, debouncedSearchLetter]);

  const isPipelineTruncated = filteredMovies.length > HOME_MOVIE_DETAIL_PIPELINE_LIMIT;

  const moviesForDetailPipeline = useMemo(
    () => filteredMovies.slice(0, HOME_MOVIE_DETAIL_PIPELINE_LIMIT),
    [filteredMovies]
  );

  return {
    searchLetter,
    setSearchLetter,
    moviesForDetailPipeline,
    isPipelineTruncated,
    pipelineLimit: HOME_MOVIE_DETAIL_PIPELINE_LIMIT,
  };
}
