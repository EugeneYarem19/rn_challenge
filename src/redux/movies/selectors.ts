import { Movie, MovieState, } from "../types";

export const selectors = {
  getCurrentSearchTitle: (state: MovieState): string => state.currentSearchTitle,
  getMovies: (state: MovieState): Movie[] => state.foundMovies,
  getNextSearchPage: (state: MovieState): number => state.nextSearchPage,
};
