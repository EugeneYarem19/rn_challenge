import { Alert, } from "react-native";
import { call, } from "redux-saga/effects";
import { expectSaga, } from "redux-saga-test-plan";
import { throwError, } from "redux-saga-test-plan/providers";

import Saga, { onSearch, } from "@src/redux/saga";
import { api, } from "@api";

import { mockedActions, mockedData, } from "./mockedData";

const infoTitle = "Something has gone wrong!";

jest.mock("react-native", () => ({
  __esModule: true,
  Alert: { alert: jest.fn(), },
}));

describe("saga tests", () => {
  describe("main Saga tests", () => {
    test("must call onSearch saga on SEARCH_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.findMoviesAction)
        .call.like({ fn: api.search, }) // call of onSearch saga can be tested by first call effect in onSearch saga
        .run();
    });
  });

  describe("onSearch saga tests", () => {
    test("must return SEARCH_FAILED without message and display error on apiInstance call", () => {
      const error = new Error(mockedData.errorMessage);

      return expectSaga(onSearch, mockedActions.findMoviesAction)
        .provide([[call(api.search, mockedData.title), throwError(error),],])
        .put(mockedActions.searchFailedNoMessageAction)
        .run()
        .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, mockedData.errorMessage));
    });

    test("must return SEARCH_SUCCESS", () => {
      return expectSaga(onSearch, mockedActions.findMoviesAction)
        .provide([
          [
            call(api.search, mockedData.title),
            {
              ok: true,
              data: {
                Response: "True",
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
        ])
        .put(mockedActions.searchSuccessAction)
        .run();
    });

    test("must return SEARCH_FAILED with message on Response='False'", () => {
      return expectSaga(onSearch, mockedActions.findMoviesAction)
        .provide([
          [
            call(api.search, mockedData.title),
            {
              ok: true,
              data: {
                Response: "False",
                Error: mockedData.errorMessage,
              },
            },
          ],
        ])
        .put(mockedActions.searchFailedAction)
        .run();
    });

    test("must return SEARCH_FAILED without message and display error on response.ok=false", () => {
      return expectSaga(onSearch, mockedActions.findMoviesAction)
        .provide([[call(api.search, mockedData.title), { ok: false, },],])
        .put(mockedActions.searchFailedNoMessageAction)
        .run()
        .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, ""));
    });
  });
});