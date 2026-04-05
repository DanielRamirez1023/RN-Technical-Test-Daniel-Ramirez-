import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/movieService";

export const useMovies = (page: number) => {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => getPopularMovies(page),
  });
};
