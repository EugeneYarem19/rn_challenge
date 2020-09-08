/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Alert, } from "react-native";
import { CallEffect, select, } from "redux-saga/effects";
import { SagaType, expectSaga, } from "redux-saga-test-plan";
import { throwError, } from "redux-saga-test-plan/providers";

import { IAction, } from "@redux";
import { errors, } from "@src/constants";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedData, } from "@tests/__mocks__";

const infoTitle = errors.infoTitle;

export const testOnApiInstanceError = (
  saga: SagaType,
  action: IAction,
  apiCall: CallEffect,
  expectedAction: IAction,
  actionName: string,
  additionalCalls: any[] = []
) => {
  test(`must return ${actionName}_FAILED without message and display error on apiInstance call`, () => {
    const error = new Error(mockedData.errorMessage);

    return expectSaga(saga, action)
      .provide([...additionalCalls, [apiCall, throwError(error),],])
      .put(expectedAction)
      .run()
      .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, mockedData.errorMessage));
  });
};

export const testOnThatsAllSuccessResponse = (
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

export const testOnThatsNotAllSuccessResponse = (
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

export const testOnFalseResponse = (
  saga: SagaType,
  action: IAction,
  apiCall: CallEffect,
  expectedAction: IAction,
  actionName: string,
  additionalCalls: any[] = []
) => {
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

export const testOnResponseOkFalse = (
  saga: SagaType,
  action: IAction,
  apiCall: CallEffect,
  expectedAction: IAction,
  actionName: string,
  additionalCalls: any[] = []
) => {
  test(`must return ${actionName}_FAILED without message and display error on response.ok=false`, () => {
    return expectSaga(saga, action)
      .provide([...additionalCalls, [apiCall, { ok: false, },],])
      .put(expectedAction)
      .run()
      .then(() => expect(Alert.alert).toHaveBeenLastCalledWith(infoTitle, ""));
  });
};
