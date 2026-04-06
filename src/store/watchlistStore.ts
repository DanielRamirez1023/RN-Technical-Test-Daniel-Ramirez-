import { create } from "zustand";
import type { Movie } from "../types/movies";

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: [],

  addToWatchlist: (movie) => {
    const exists = get().watchlist.some((m) => m.id === movie.id);
    if (!exists) {
      set((state) => ({
        watchlist: [...state.watchlist, movie],
      }));
    }
  },

  removeFromWatchlist: (id) => {
    set((state) => ({
      watchlist: state.watchlist.filter((m) => m.id !== id),
    }));
  },

  isInWatchlist: (id) => {
    return get().watchlist.some((m) => m.id === id);
  },
}));
