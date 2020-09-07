import { initState, moviesReducer as Reducer, } from "@src/redux/movies";

import { mockedActions, mockedData, } from "../mockedData";

describe("reducer tests", () => {
  test("must return initial state", () => {
    expect(Reducer(undefined, { type: "", })).toEqual(initState);
  });

  test("must handle SEARCH_REQUEST action", () => {
    expect(Reducer(undefined, mockedActions.findMoviesAction)).toEqual({
      ...initState,
      isFetchingMore: false,
      isSearching: true,
      isThatsAll: true,
      currentSearchTitle: mockedData.title,
      foundMovies: [],
      searchErrorMessage: "",
      nextSearchPage: 2,
    });
  });

  test("must handle SEARCH_SUCCESS action", () => {
    expect(Reducer(undefined, mockedActions.searchSuccessAction)).toEqual({
      ...initState,
      isSearching: false,
      foundMovies: mockedData.movies,
      isThatsAll: false,
    });
  });

  test("must handle SEARCH_FAILED action", () => {
    expect(Reducer(undefined, mockedActions.searchFailedAction)).toEqual({
      ...initState,
      isSearching: false,
      searchErrorMessage: mockedData.errorMessage,
      isThatsAll: true,
    });
  });

  test("must handle FETCH_MORE_REQUEST action", () => {
    expect(Reducer(undefined, mockedActions.fetchMoreAction)).toEqual({
      ...initState,
      isFetchingMore: true,
      searchErrorMessage: "",
    });
  });

  test("must handle FETCH_MORE_SUCCESS action", () => {
    expect(Reducer({ ...initState, foundMovies: mockedData.movies, }, mockedActions.fetchMoreSuccessAction)).toEqual({
      ...initState,
      isFetchingMore: false,
      foundMovies: [...mockedData.movies, ...mockedData.movies,],
      nextSearchPage: 3,
      isThatsAll: false,
    });
  });

  test("must handle FETCH_MORE_FAILED action", () => {
    expect(Reducer(undefined, mockedActions.fetchMoreFailedAction)).toEqual({
      ...initState,
      isFetchingMore: false,
      searchErrorMessage: mockedData.errorMessage,
    });
  });

  test("must handle FETCH_MOVIE_REQUEST action", () => {
    expect(Reducer(undefined, mockedActions.fetchMovieAction)).toEqual({
      ...initState,
      isFetchingMovie: true,
    });
  });

  test("must handle FETCH_MOVIE_SUCCESS action", () => {
    const secondMovie = { ...mockedData.movies[0], id: "t2", };
    const resultFoundMovies = [{}, secondMovie,];
    resultFoundMovies[0] = { ...mockedData.movies[0], ...mockedData.detailedInfo, };

    expect(Reducer({ ...initState, foundMovies: [...mockedData.movies, secondMovie,], }, mockedActions.fetchMovieSuccessAction)).toEqual({
      ...initState,
      isFetchingMovie: false,
      foundMovies: resultFoundMovies,
    });
  });

  test("must handle FETCH_MOVIE_FAILED action", () => {
    expect(Reducer(undefined, mockedActions.fetchMovieFailedAction)).toEqual({
      ...initState,
      isFetchingMovie: false,
    });
  });
});
