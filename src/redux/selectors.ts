import { State, Movie, } from "./types";

export const selectors = {
  getCurrentSearchTitle: (state: State): string => state.currentSearchTitle,
  getMovies: (state: State): Movie[] => state.foundMovies,
  getNextSearchPage: (state: State): number => state.nextSearchPage,
};
