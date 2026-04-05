import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getMovieCredits, getMovieDetail, getPopularMovies } from "../services/movieService";

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
    queryFn: async () => {
      const [detail, credits] = await Promise.all([getMovieDetail(movieId), getMovieCredits(movieId)]);

      return {
        ...detail,
        cast: credits.cast,
      };
    },
  });
};

export const useMoviesWithDetails = (movies: { id: number }[]) => {
  return useQueries({
    queries: movies.map((movie) => ({
      queryKey: ["movie-detail", movie.id],
      queryFn: async () => {
        const [detail, credits] = await Promise.all([getMovieDetail(movie.id), getMovieCredits(movie.id)]);

        return {
          ...detail,
          cast: credits.cast,
        };
      },
      staleTime: 1000 * 60 * 10, // cache 10 min
    })),
  });
};
