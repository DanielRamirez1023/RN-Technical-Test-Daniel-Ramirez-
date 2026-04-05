import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/movieService";

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
