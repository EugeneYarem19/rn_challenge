import { Alert, } from "react-native";

import { displayInfo, networkErrorHandler, } from "@utils";

import { mockedData, } from "../mockedData";

jest.mock("react-native", () => ({
  __esModule: true,
  Alert: { alert: jest.fn(), },
}));

describe("utils tests", () => {
  test("displayInfo must call alert with title and message", () => {
    displayInfo(mockedData.errorMessage, mockedData.title);
    expect(Alert.alert).toHaveBeenLastCalledWith(mockedData.title, mockedData.errorMessage);
  });

  test("displayInfo must call alert with message and empty title", () => {
    displayInfo(mockedData.errorMessage);
    expect(Alert.alert).toHaveBeenLastCalledWith("", mockedData.errorMessage);
  });

  test("networkErrorHandler must return 'Bad request' on CLIENT_ERROR", () => {
    // @ts-ignore
    expect(networkErrorHandler({ problem: "CLIENT_ERROR", ok: false, originalError: null, })).toEqual("Bad request");
  });

  test("networkErrorHandler must return 'Please check internet connection' on NETWORK_ERROR", () => {
    // @ts-ignore
    expect(networkErrorHandler({ problem: "NETWORK_ERROR", ok: false, })).toEqual("Please check internet connection");
  });

  test("networkErrorHandler must return 'Server error' on SERVER_ERROR", () => {
    // @ts-ignore
    expect(networkErrorHandler({ problem: "SERVER_ERROR", ok: false, })).toEqual("Server error");
  });

  test("networkErrorHandler must return empty string on any other error", () => {
    // @ts-ignore
    expect(networkErrorHandler({ problem: "CANCEL_ERROR", ok: false, })).toEqual("");
  });
});
