import { apiClient } from "../api/client";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average?: number;
  release_date?: string;
  genre_ids?: number[];
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

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: Array<{ certification: string }>;
}

export interface MovieReleaseDates {
  results?: ReleaseDatesResult[];
}

export interface CastMember {
  id: number;
  name: string;
  gender: number;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  cast: CastMember[];
  crew: CrewMember[];
  release_dates?: MovieReleaseDates;
}

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
