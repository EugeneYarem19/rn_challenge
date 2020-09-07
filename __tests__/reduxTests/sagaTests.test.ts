/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Alert, } from "react-native";
import { CallEffect, call, select, } from "redux-saga/effects";
import { SagaType, expectSaga, } from "redux-saga-test-plan";
import { throwError, } from "redux-saga-test-plan/providers";

import Saga, { onFetchMore, onFetchMovie, onSearch, } from "@src/redux/movies/saga";
import { IAction, } from "@redux";
import { fetchMoreMovie, fetchMovie, getSearchResult, } from "@api";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedActions, mockedData, } from "../mockedData";

const infoTitle = "Something has gone wrong!";

jest.mock("react-native", () => ({
  __esModule: true,
  Alert: { alert: jest.fn(), },
}));

const testOnApiInstanceError = (saga: SagaType, action: IAction, apiCall: CallEffect, expectedAction: IAction, actionName: string, additionalCalls: any[] = []) => {
  test(`must return ${actionName}_FAILED without message and display error on apiInstance call`, () => {
    const error = new Error(mockedData.errorMessage);

    return expectSaga(saga, action)
      .provide([...additionalCalls, [apiCall, throwError(error),],])
      .put(expectedAction)
      .run()
      .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, mockedData.errorMessage));
  });
};

const testOnThatsAllSuccessResponse = (
  saga: SagaType,
  action: IAction,
  apiCall: CallEffect,
  expectedAction: IAction,
  actionName: string,
  additionalCalls: any[] = []
) => {
  test(`must return ${actionName}_SUCCESS with isThatsAll = true`, () => {
    return expectSaga(saga, action)
      .provide([
        ...additionalCalls,
        [
          apiCall,
          {
            ok: true,
            data: {
              Response: "True",
              totalResults: 1,
              Search: [
                {
                  imdbID: mockedData.id,
                  Poster: mockedData.movies[0].poster,
                  Title: mockedData.title,
                },
              ],
            },
          },
        ],
        [select(selectors.getMovies), [],],
      ])
      .put(expectedAction)
      .run();
  });
};

const testOnThatsNotAllSuccessResponse = (
  saga: SagaType,
  action: IAction,
  apiCall: CallEffect,
  expectedAction: IAction,
  actionName: string,
  additionalCalls: any[] = []
) => {
  test(`must return ${actionName}_SUCCESS with isThatsAll = false`, () => {
    return expectSaga(saga, action)
      .provide([
        ...additionalCalls,
        [
          apiCall,
          {
            ok: true,
            data: {
              Response: "True",
              totalResults: 2,
              Search: [
                {
                  imdbID: mockedData.id,
                  Poster: mockedData.movies[0].poster,
                  Title: mockedData.title,
                },
              ],
            },
          },
        ],
        [select(selectors.getMovies), [],],
      ])
      .put(expectedAction)
      .run();
  });
};

const testOnFalseResponse = (saga: SagaType, action: IAction, apiCall: CallEffect, expectedAction: IAction, actionName: string, additionalCalls: any[] = []) => {
  test(`must return ${actionName}_FAILED with message on Response='False'`, () => {
    return expectSaga(saga, action)
      .provide([
        ...additionalCalls,
        [
          apiCall,
          {
            ok: true,
            data: {
              Response: "False",
              Error: mockedData.errorMessage,
            },
          },
        ],
      ])
      .put(expectedAction)
      .run();
  });
};

const testOnResponseOkFalse = (saga: SagaType, action: IAction, apiCall: CallEffect, expectedAction: IAction, actionName: string, additionalCalls: any[] = []) => {
  test(`must return ${actionName}_FAILED without message and display error on response.ok=false`, () => {
    return expectSaga(saga, action)
      .provide([...additionalCalls, [apiCall, { ok: false, },],])
      .put(expectedAction)
      .run()
      .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, ""));
  });
};

describe("saga tests", () => {
  describe("main Saga tests", () => {
    test("must call onSearch saga on SEARCH_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.findMoviesAction)
        .call.like({ fn: getSearchResult, }) // call of onSearch saga can be tested by first call effect in onSearch saga
        .run();
    });

    test("must call onFetchMore saga on FETCH_MORE_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.fetchMoreAction)
        .select.like({ selector: selectors.getCurrentSearchTitle, }) // call of onFetchMore saga can be tested by first select effect in onFetchMore saga
        .run();
    });

    test("must call onFetchMovie saga on FETCH_MOVIE_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.fetchMovieAction)
        .select.like({ selector: selectors.getMovies, }) // call of onFetchMovie saga can be tested by first select effect in onFetchMovie saga
        .run();
    });
  });

  describe("onSearch saga tests", () => {
    testOnApiInstanceError(onSearch, mockedActions.findMoviesAction, call(getSearchResult, mockedData.title), mockedActions.searchFailedNoMessageAction, "SEARCH");
    testOnThatsAllSuccessResponse(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchSuccessThatsAllAction,
      "SEARCH"
    );
    testOnThatsNotAllSuccessResponse(onSearch, mockedActions.findMoviesAction, call(getSearchResult, mockedData.title), mockedActions.searchSuccessAction, "SEARCH");
    testOnFalseResponse(onSearch, mockedActions.findMoviesAction, call(getSearchResult, mockedData.title), mockedActions.searchFailedAction, "SEARCH");
    testOnResponseOkFalse(onSearch, mockedActions.findMoviesAction, call(getSearchResult, mockedData.title), mockedActions.searchFailedNoMessageAction, "SEARCH");
  });

  describe("onFetchMore saga tests", () => {
    test("must call api.fetchMore with correct parameters gotten from state", () => {
      return expectSaga(onFetchMore)
        .provide([
          [select(selectors.getCurrentSearchTitle), mockedData.title,],
          [select(selectors.getNextSearchPage), 2,],
        ])
        .call(fetchMoreMovie, mockedData.title, 2)
        .run();
    });

    testOnApiInstanceError(
      onFetchMore,
      mockedActions.fetchMoreAction,
      call(fetchMoreMovie, mockedData.title, 2),
      mockedActions.fetchMoreFailedNoMessageAction,
      "FETCH_MORE",
      [
        [select(selectors.getCurrentSearchTitle), mockedData.title,],
        [select(selectors.getNextSearchPage), 2,],
      ]
    );

    testOnThatsAllSuccessResponse(
      onFetchMore,
      mockedActions.fetchMoreAction,
      call(fetchMoreMovie, mockedData.title, 2),
      mockedActions.fetchMoreSuccessThatsAllAction,
      "FETCH_MORE",
      [
        [select(selectors.getCurrentSearchTitle), mockedData.title,],
        [select(selectors.getNextSearchPage), 2,],
      ]
    );

    testOnThatsNotAllSuccessResponse(
      onFetchMore,
      mockedActions.fetchMoreAction,
      call(fetchMoreMovie, mockedData.title, 2),
      mockedActions.fetchMoreSuccessAction,
      "FETCH_MORE",
      [
        [select(selectors.getCurrentSearchTitle), mockedData.title,],
        [select(selectors.getNextSearchPage), 2,],
      ]
    );

    testOnFalseResponse(onFetchMore, mockedActions.fetchMoreAction, call(fetchMoreMovie, mockedData.title, 2), mockedActions.fetchMoreFailedAction, "FETCH_MORE", [
      [select(selectors.getCurrentSearchTitle), mockedData.title,],
      [select(selectors.getNextSearchPage), 2,],
    ]);

    testOnResponseOkFalse(
      onFetchMore,
      mockedActions.fetchMoreAction,
      call(fetchMoreMovie, mockedData.title, 2),
      mockedActions.fetchMoreFailedNoMessageAction,
      "FETCH_MORE",
      [
        [select(selectors.getCurrentSearchTitle), mockedData.title,],
        [select(selectors.getNextSearchPage), 2,],
      ]
    );
  });

  describe("onFetchMovie saga tests", () => {
    test("must cancel request because this film has been already requested", () => {
      return expectSaga(onFetchMovie, mockedActions.fetchMovieAction)
        .provide([[select(selectors.getMovies), { ...mockedData.movies, ...mockedData.detailedInfo, },],])
        .put(mockedActions.fetchMovieFailedAction)
        .run();
    });

    testOnApiInstanceError(onFetchMovie, mockedActions.fetchMovieAction, call(fetchMovie, mockedData.id), mockedActions.fetchMovieFailedAction, "FETCH_MOVIE", [
      [select(selectors.getMovies), mockedData.movies,],
    ]);

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
          // TODO: message move to constants
          expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, "We cannot fetch detailed information about this movie. Error: \n" + mockedData.errorMessage)
        );
    });

    testOnResponseOkFalse(onFetchMovie, mockedActions.fetchMovieAction, call(fetchMovie, mockedData.id), mockedActions.fetchMovieFailedAction, "FETCH_MOVIE", [
      [select(selectors.getMovies), mockedData.movies,],
    ]);
  });
});
