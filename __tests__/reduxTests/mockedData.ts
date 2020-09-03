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

export const mockedActions = {
  findMoviesAction: {
    type: actionTypes.SEARCH_REQUEST,
    payload: { title: title, },
  },
  searchSuccessAction: {
    type: actionTypes.SEARCH_SUCCESS,
    payload: { movies: mockedData.movies, },
  },
  searchFailedAction: {
    type: actionTypes.SEARCH_FAILED,
    payload: { errorMessage: mockedData.errorMessage, },
  },

  fetchMoreAction: { type: actionTypes.FETCH_MORE_REQUEST, },
  fetchMoreSuccessAction: {
    type: actionTypes.FETCH_MORE_SUCCESS,
    payload: { movies: mockedData.movies, },
  },
  fetchMoreFailedAction: { type: actionTypes.FETCH_MORE_FAILED, },

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
