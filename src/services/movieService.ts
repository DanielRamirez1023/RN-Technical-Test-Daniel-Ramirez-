import { apiClient } from "../api/client";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const getPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await apiClient.get("/movie/popular", {
    params: { page },
  });

  return response.data;
};
