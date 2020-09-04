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
  actionTypes,
} from "./types";

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
