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
  actions as actionTypes,
} from "./types";

export const actions = {
  findMovies: (title: string): SearchAction => ({
    type: actionTypes.SEARCH_REQUEST,
    payload: { title, },
  }),
  searchSuccess: (movies: Movie[]): SearchSuccessAction => ({
    type: actionTypes.SEARCH_SUCCESS,
    payload: { movies, },
  }),
  searchFailed: (): SearchFailedAction => ({ type: actionTypes.SEARCH_FAILED, }),

  fetchMore: (): FetchMoreAction => ({ type: actionTypes.FETCH_MORE_REQUEST, }),
  fetchMoreSuccess: (movies: Movie[]): FetchMoreSuccessAction => ({
    type: actionTypes.FETCH_MORE_SUCCESS,
    payload: { movies, },
  }),
  fetchMoreFailed: (): FetchMoreFailedAction => ({ type: actionTypes.FETCH_MORE_FAILED, }),

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
