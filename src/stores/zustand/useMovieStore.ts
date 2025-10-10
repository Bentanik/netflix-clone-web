import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Movie {
  id: number;
  title: string;
  image: string;
  description?: string;
  episode?: number;
}

interface MovieStore {
  myList: Movie[];
  addToMyList: (movie: Movie) => void;
  removeFromMyList: (movieId: number) => void;
  isInMyList: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      myList: [],

      addToMyList: (movie) => {
        const { myList } = get();
        if (!myList.find((m) => m.id === movie.id)) {
          set({ myList: [...myList, movie] });
        }
      },

      removeFromMyList: (movieId) => {
        set({ myList: get().myList.filter((m) => m.id !== movieId) });
      },

      isInMyList: (movieId) => {
        return get().myList.some((m) => m.id === movieId);
      },
    }),
    {
      name: "movie-storage",
    }
  )
);
