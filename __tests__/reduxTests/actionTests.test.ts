import { actions, } from "@redux";
import { mockedActions, mockedData, } from "./mockedData";

describe("actions tests", () => {
  test("must create an action to find movies by title", () => {
    expect(actions.findMovies(mockedData.title)).toEqual(mockedActions.findMoviesAction);
  });

  test("must create an action to notify about search success", () => {
    expect(actions.searchSuccess(mockedData.movies)).toEqual(mockedActions.searchSuccessAction);
  });

  test("must create an action to notify about search fail", () => {
    expect(actions.searchFailed()).toEqual(mockedActions.searchFailedAction);
  });

  test("must create an action to fetch more movies", () => {
    expect(actions.fetchMore()).toEqual(mockedActions.fetchMoreAction);
  });

  test("must create an action to notify about fetching new movies success", () => {
    expect(actions.fetchMoreSuccess(mockedData.movies)).toEqual(mockedActions.fetchMoreSuccessAction);
  });

  test("must create an action to notify about fetching new movies fail", () => {
    expect(actions.fetchMoreFailed()).toEqual(mockedActions.fetchMoreFailedAction);
  });

  test("must create an action to fetch detailed information about movie by id", () => {
    expect(actions.fetchMovie(mockedData.id)).toEqual(mockedActions.fetchMovieAction);
  });

  test("must create an action to notify about fetching detailed information success", () => {
    expect(actions.fetchMovieSuccess(mockedData.id, mockedData.fullPlot)).toEqual(mockedActions.fetchMovieSuccessAction);
  });

  test("must create an action to notify about fetching detailed information fail", () => {
    expect(actions.fetchMovieFailed()).toEqual(mockedActions.fetchMovieFailedAction);
  });
});
