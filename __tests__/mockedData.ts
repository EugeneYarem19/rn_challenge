import { actionTypes, } from "@redux";

const title = "Test";

export const mockedData = {
  detailedInfo: {
    fullPlot: "Full plot",
    genre: "Drama",
    director: "Chris Mason Johnson",
    cast: "Actors",
    ratings: [{ source: "Metacritic", value: "70/100", },],
  },
  errorMessage: "Error",
  id: "t1",
  movies: [
    {
      id: "t1",
      poster: "http://",
      title: title,
    },
  ],
  title: title,
};

const returnNotAllMovies = {
  payload: {
    movies: mockedData.movies,
    isThatsAll: false,
  },
};

const returnAllMovies = {
  payload: {
    movies: mockedData.movies,
    isThatsAll: true,
  },
};

const returnWithError = { payload: { errorMessage: mockedData.errorMessage, }, };

const returnWithEmptyError = { payload: { errorMessage: "", }, };

export const mockedActions = {
  findMoviesAction: {
    type: actionTypes.SEARCH_REQUEST,
    payload: { title: title, },
  },
  searchSuccessAction: {
    type: actionTypes.SEARCH_SUCCESS,
    ...returnNotAllMovies,
  },
  searchSuccessThatsAllAction: {
    type: actionTypes.SEARCH_SUCCESS,
    ...returnAllMovies,
  },
  searchFailedAction: {
    type: actionTypes.SEARCH_FAILED,
    ...returnWithError,
  },
  searchFailedNoMessageAction: {
    type: actionTypes.SEARCH_FAILED,
    ...returnWithEmptyError,
  },

  fetchMoreAction: { type: actionTypes.FETCH_MORE_REQUEST, },
  fetchMoreSuccessAction: {
    type: actionTypes.FETCH_MORE_SUCCESS,
    ...returnNotAllMovies,
  },
  fetchMoreSuccessThatsAllAction: {
    type: actionTypes.FETCH_MORE_SUCCESS,
    ...returnAllMovies,
  },
  fetchMoreFailedAction: { type: actionTypes.FETCH_MORE_FAILED, ...returnWithError, },
  fetchMoreFailedNoMessageAction: { type: actionTypes.FETCH_MORE_FAILED, ...returnWithEmptyError, },

  fetchMovieAction: {
    type: actionTypes.FETCH_MOVIE_REQUEST,
    payload: { id: mockedData.id, },
  },
  fetchMovieSuccessAction: {
    type: actionTypes.FETCH_MOVIE_SUCCESS,
    payload: {
      id: mockedData.id,
      detailedInfo: mockedData.detailedInfo,
    },
  },
  fetchMovieFailedAction: { type: actionTypes.FETCH_MOVIE_FAILED, },
};
