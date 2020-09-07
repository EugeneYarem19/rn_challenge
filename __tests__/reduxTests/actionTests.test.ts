import { moviesActions, } from "@redux";

import { mockedActions, mockedData, } from "../mockedData";

describe("actions tests", () => {
  test("must create an action to find movies by title", () => {
    expect(moviesActions.findMovies(mockedData.title)).toEqual(mockedActions.findMoviesAction);
  });

  test("must create an action to notify about search success with isThatsAll = true", () => {
    expect(moviesActions.searchSuccess(mockedData.movies, true)).toEqual(mockedActions.searchSuccessThatsAllAction);
  });

  test("must create an action to notify about search success with isThatsAll = false", () => {
    expect(moviesActions.searchSuccess(mockedData.movies, false)).toEqual(mockedActions.searchSuccessAction);
  });

  test("must create an action to notify about search fail with message", () => {
    expect(moviesActions.searchFailed(mockedData.errorMessage)).toEqual(mockedActions.searchFailedAction);
  });

  test("must create an action to notify about search fail without message", () => {
    expect(moviesActions.searchFailed("")).toEqual(mockedActions.searchFailedNoMessageAction);
  });

  test("must create an action to fetch more movies", () => {
    expect(moviesActions.fetchMore()).toEqual(mockedActions.fetchMoreAction);
  });

  test("must create an action to notify about fetching new movies success with isThatsAll = true", () => {
    expect(moviesActions.fetchMoreSuccess(mockedData.movies, true)).toEqual(mockedActions.fetchMoreSuccessThatsAllAction);
  });

  test("must create an action to notify about fetching new movies success with isThatsAll = false", () => {
    expect(moviesActions.fetchMoreSuccess(mockedData.movies, false)).toEqual(mockedActions.fetchMoreSuccessAction);
  });

  test("must create an action to notify about fetching new movies fail with message", () => {
    expect(moviesActions.fetchMoreFailed(mockedData.errorMessage)).toEqual(mockedActions.fetchMoreFailedAction);
  });

  test("must create an action to notify about fetching new movies fail without message", () => {
    expect(moviesActions.fetchMoreFailed("")).toEqual(mockedActions.fetchMoreFailedNoMessageAction);
  });

  test("must create an action to fetch detailed information about movie by id", () => {
    expect(moviesActions.fetchMovie(mockedData.id)).toEqual(mockedActions.fetchMovieAction);
  });

  test("must create an action to notify about fetching detailed information success", () => {
    expect(moviesActions.fetchMovieSuccess(mockedData.id, mockedData.detailedInfo)).toEqual(mockedActions.fetchMovieSuccessAction);
  });

  test("must create an action to notify about fetching detailed information fail", () => {
    expect(moviesActions.fetchMovieFailed()).toEqual(mockedActions.fetchMovieFailedAction);
  });
});
