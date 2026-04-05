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

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: { id: number; name: string }[];
}

export interface CastMember {
  id: number;
  name: string;
  gender: number;
  character: string;
}

export interface CreditsResponse {
  cast: CastMember[];
}

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await apiClient.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId: number): Promise<CreditsResponse> => {
  const response = await apiClient.get(`/movie/${movieId}/credits`);
  return response.data;
};
