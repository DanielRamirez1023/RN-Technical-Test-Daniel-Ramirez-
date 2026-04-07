import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import {
  discoverMoviesByGenre,
  getMovieDetail,
  getMovieGenresList,
  getPopularMovies,
} from "../services/movieService";

export const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ["movies"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};

export const useMovieDetail = (movieId: number) => {
  return useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => getMovieDetail(movieId),
  });
};

export const useMoviesWithDetails = (movies: { id: number }[]) => {
  return useQueries({
    queries: movies.map((movie) => ({
      queryKey: ["movie-detail", movie.id],
      queryFn: () => getMovieDetail(movie.id),
      staleTime: 1000 * 60 * 10,
    })),
  });
};

export const useMovieGenresList = () => {
  return useQuery({
    queryKey: ["movie-genres-list"],
    queryFn: getMovieGenresList,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useDiscoverMoviesByGenre = (genreId: number) => {
  return useInfiniteQuery({
    queryKey: ["discover-movies", genreId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => discoverMoviesByGenre(genreId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: genreId > 0,
  });
};
