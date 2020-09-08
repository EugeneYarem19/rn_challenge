import { Alert, } from "react-native";
import { call, select, } from "redux-saga/effects";
import { expectSaga, } from "redux-saga-test-plan";

import { errors, } from "@src/constants";
import { fetchMovie, } from "@api";
import { onFetchMovie, } from "@src/redux/movies/saga";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedActions, mockedData, } from "@tests/__mocks__";
import { testOnApiInstanceError, testOnResponseOkFalse, } from "@tests/__utils__";

const infoTitle = errors.infoTitle;

jest.mock("react-native", () => ({
  __esModule: true,
  Alert: { alert: jest.fn(), },
}));

describe("Movies saga tests", () => {
  describe("onFetchMovie saga tests", () => {
    test("must cancel request because this film has been already requested", () => {
      return expectSaga(onFetchMovie, mockedActions.fetchMovieAction)
        .provide([
          [select(selectors.getMovies), { ...mockedData.movies, ...mockedData.detailedInfo, },],
        ])
        .put(mockedActions.fetchMovieFailedAction)
        .run();
    });

    testOnApiInstanceError(
      onFetchMovie,
      mockedActions.fetchMovieAction,
      call(fetchMovie, mockedData.id),
      mockedActions.fetchMovieFailedAction,
      "FETCH_MOVIE",
      [[select(selectors.getMovies), mockedData.movies,],]
    );

    test(`must return FETCH_MOVIE_SUCCESS`, () => {
      return expectSaga(onFetchMovie, mockedActions.fetchMovieAction)
        .provide([
          [select(selectors.getMovies), mockedData.movies,],
          [
            call(fetchMovie, mockedData.id),
            {
              ok: true,
              data: {
                Response: "True",
                Genre: mockedData.detailedInfo.genre,
                Director: mockedData.detailedInfo.director,
                Plot: mockedData.detailedInfo.fullPlot,
                Actors: mockedData.detailedInfo.cast,
                Ratings: [
                  {
                    Source: mockedData.detailedInfo.ratings[0].source,
                    Value: mockedData.detailedInfo.ratings[0].value,
                  },
                ],
              },
            },
          ],
        ])
        .put(mockedActions.fetchMovieSuccessAction)
        .run();
    });

    test("must return FETCH_MOVIE_FAILED without message and display error on Response='False'", () => {
      return expectSaga(onFetchMovie, mockedActions.fetchMovieAction)
        .provide([
          [select(selectors.getMovies), mockedData.movies,],
          [
            call(fetchMovie, mockedData.id),
            {
              ok: true,
              data: {
                Response: "False",
                Error: mockedData.errorMessage,
              },
            },
          ],
        ])
        .put(mockedActions.fetchMovieFailedAction)
        .run()
        .then(() =>
          expect(Alert.alert).toHaveBeenLastCalledWith(
            infoTitle,
            errors.infoDescription + mockedData.errorMessage
          )
        );
    });

    testOnResponseOkFalse(
      onFetchMovie,
      mockedActions.fetchMovieAction,
      call(fetchMovie, mockedData.id),
      mockedActions.fetchMovieFailedAction,
      "FETCH_MOVIE",
      [[select(selectors.getMovies), mockedData.movies,],]
    );
  });
});
