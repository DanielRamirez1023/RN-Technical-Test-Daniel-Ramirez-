import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getMovieDetail, getPopularMovies } from "../services/movieService";

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
