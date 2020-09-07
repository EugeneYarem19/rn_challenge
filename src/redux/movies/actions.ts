import {
  Movie,
  MovieDetailing,
  FetchMoreAction,
  FetchMoreFailedAction,
  FetchMoreSuccessAction,
  FetchMovieAction,
  FetchMovieFailedAction,
  FetchMovieSuccessAction,
  SearchAction,
  SearchFailedAction,
  SearchSuccessAction,
} from "../types";

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

export const actions = {
  findMovies: (title: string): SearchAction => ({
    type: actionTypes.SEARCH_REQUEST,
    payload: { title, },
  }),
  searchSuccess: (movies: Movie[], isThatsAll: boolean): SearchSuccessAction => ({
    type: actionTypes.SEARCH_SUCCESS,
    payload: { movies, isThatsAll, },
  }),
  searchFailed: (errorMessage: string): SearchFailedAction => ({ type: actionTypes.SEARCH_FAILED, payload: { errorMessage, }, }),

  fetchMore: (): FetchMoreAction => ({ type: actionTypes.FETCH_MORE_REQUEST, }),
  fetchMoreSuccess: (movies: Movie[], isThatsAll: boolean): FetchMoreSuccessAction => ({
    type: actionTypes.FETCH_MORE_SUCCESS,
    payload: { movies, isThatsAll, },
  }),
  fetchMoreFailed: (errorMessage: string): FetchMoreFailedAction => ({ type: actionTypes.FETCH_MORE_FAILED, payload: { errorMessage, }, }),

  fetchMovie: (id: string): FetchMovieAction => ({
    type: actionTypes.FETCH_MOVIE_REQUEST,
    payload: { id, },
  }),
  fetchMovieSuccess: (id: string, detailedInfo: MovieDetailing): FetchMovieSuccessAction => ({
    type: actionTypes.FETCH_MOVIE_SUCCESS,
    payload: { id, detailedInfo, },
  }),
  fetchMovieFailed: (): FetchMovieFailedAction => ({ type: actionTypes.FETCH_MOVIE_FAILED, }),
};
