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
