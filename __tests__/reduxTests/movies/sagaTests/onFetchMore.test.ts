import { call, select, } from "redux-saga/effects";
import { expectSaga, } from "redux-saga-test-plan";

import { fetchMoreMovie, } from "@api";
import { onFetchMore, } from "@src/redux/movies/saga";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedActions, mockedData, } from "@tests/__mocks__";
import {
  testOnApiInstanceError,
  testOnFalseResponse,
  testOnResponseOkFalse,
  testOnThatsAllSuccessResponse,
  testOnThatsNotAllSuccessResponse,
} from "@tests/__utils__";

jest.mock("react-native", () => ({
  __esModule: true,
  Alert: { alert: jest.fn(), },
}));

describe("Movies saga tests", () => {
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
});
