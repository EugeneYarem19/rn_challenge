import { call, } from "redux-saga/effects";

import { getSearchResult, } from "@api";
import { onSearch, } from "@src/redux/movies/saga";

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
  describe("onSearch saga tests", () => {
    testOnApiInstanceError(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchFailedNoMessageAction,
      "SEARCH"
    );
    testOnThatsAllSuccessResponse(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchSuccessThatsAllAction,
      "SEARCH"
    );
    testOnThatsNotAllSuccessResponse(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchSuccessAction,
      "SEARCH"
    );
    testOnFalseResponse(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchFailedAction,
      "SEARCH"
    );
    testOnResponseOkFalse(
      onSearch,
      mockedActions.findMoviesAction,
      call(getSearchResult, mockedData.title),
      mockedActions.searchFailedNoMessageAction,
      "SEARCH"
    );
  });
});
