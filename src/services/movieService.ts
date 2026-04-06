import { apiClient } from "../api/client";
import { MovieDetail, MoviesResponse } from "../types/movies";

export const getPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await apiClient.get("/movie/popular", {
    params: { page },
  });

  return response.data;
};

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const { data } = await apiClient.get(`/movie/${movieId}`, {
    params: { append_to_response: "credits,release_dates" },
  });

  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average ?? 0,
    release_date: data.release_date ?? "",
    runtime: data.runtime ?? null,
    genres: data.genres ?? [],
    production_companies: data.production_companies ?? [],
    cast: data.credits?.cast ?? [],
    crew: data.credits?.crew ?? [],
    release_dates: data.release_dates,
  };
};
