export const actionTypes = {
  SEARCH_REQUEST: "SEARCH_REQUEST",
  SEARCH_SUCCESS: "SEARCH_SUCCESS",
  SEARCH_FAILED: "SEARCH_FAILED",

  FETCH_MORE_REQUEST: "FETCH_MORE_REQUEST",
  FETCH_MORE_SUCCESS: "FETCH_MORE_SUCCESS",
  FETCH_MORE_FAILED: "FETCH_MORE_FAILED",

  FETCH_MOVIE_REQUEST: "FETCH_MOVIE_REQUEST",
  FETCH_MOVIE_SUCCESS: "FETCH_MOVIE_SUCCESS",
  FETCH_MOVIE_FAILED: "FETCH_MOVIE_FAILED",
};

export const initState = {
  currentSearchTitle: "",
  foundMovies: [],
  isFetchingMore: false,
  isFetchingMovie: false,
  isSearching: false,
  isThatsAll: false,
  nextSearchPage: 2, // can be [1-100] (from API). First page will be returned by search request, so it must be equal 2 for fetch more request
  searchErrorMessage: "",
};

export interface Rating {
  source: string;
  value: string;
}

export interface Movie {
  // optional fields will be set after user will request full info about movie
  id: string;
  poster?: string; // can be empty
  title: string;
  genre?: string;
  director?: string;
  fullPlot?: string;
  cast?: string;
  ratings?: Rating[];
}

export interface MovieDetailing {
  genre: string;
  director: string;
  fullPlot: string;
  cast: string;
  ratings: Rating[];
}

export interface State {
  currentSearchTitle: string;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isFetchingMovie: boolean;
  isSearching: boolean;
  isThatsAll: boolean; // indicates that not fetched movies are on the server on our response
  nextSearchPage: number; // next page, which will be updated only on FETCH_MORE_SUCCESS or will be set to 2 on new search
  searchErrorMessage: string; // For example, "Too many results." / "Movie not found!"
}

interface IAction {
  type: string;
}

interface IResponseFailedAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface SearchAction extends IAction {
  payload: {
    title: string;
  };
}

export interface SearchSuccessAction extends IAction {
  payload: {
    movies: Movie[] | [];
    isThatsAll: boolean;
  };
}

export type SearchFailedAction = IResponseFailedAction;

export type FetchMoreAction = IAction;

export type FetchMoreSuccessAction = SearchSuccessAction;

export type FetchMoreFailedAction = IResponseFailedAction;

export interface FetchMovieAction extends IAction {
  payload: {
    id: string;
  };
}

export interface FetchMovieSuccessAction extends IAction {
  payload: {
    id: string;
    detailedInfo: MovieDetailing;
  };
}

export type FetchMovieFailedAction = IAction;

export type ActionTypes =
  | FetchMoreAction
  | FetchMoreSuccessAction
  | FetchMoreFailedAction
  | FetchMovieAction
  | FetchMovieSuccessAction
  | FetchMovieFailedAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailedAction;
