import React from "react";
import configureStore from "redux-mock-store";
import { Provider, } from "react-redux";
import { render, fireEvent, } from "@testing-library/react-native";

import { SearchBar, } from "@components";
import { SearchButton, } from "@src/components/SearchBar/components";

import { mockedActions, mockedData, } from "@tests/__mocks__";
import { snapshotTest, } from "@tests/__utils__";

const mockStore = configureStore([]);

describe("SearchBar tests", () => {
  test("SearchButton must renders correctly", () => {
    snapshotTest(<SearchButton onPress={() => null} />);
  });

  test("SearchBar must renders correctly", () => {
    const store = mockStore({});
    snapshotTest(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });

  test("SearchButton must be clickable", () => {
    const onPress = jest.fn();
    const { getByText, } = render(<SearchButton onPress={onPress} />);

    fireEvent.press(getByText(""));

    expect(onPress).toHaveBeenCalled();
  });

  test("SearchBar must start search with provided title", () => {
    const store = mockStore({});
    const { getByPlaceholderText, getByTestId, } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Search"), mockedData.title);
    fireEvent.press(getByTestId("SearchButton"));

    const actions = store.getActions();
    const expectedPayload = mockedActions.findMoviesAction;
    expect(actions).toEqual([expectedPayload,]);
  });

  test("SearchBar must not start search multiple times with the same title", () => {
    const store = mockStore({ currentSearchTitle: mockedData.title, });
    const { getByPlaceholderText, getByTestId, } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Search"), mockedData.title);
    fireEvent.press(getByTestId("SearchButton"));

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test("SearchBar must not start search without provided title", () => {
    const store = mockStore({});
    const { getByPlaceholderText, getByTestId, } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("Search"), "");
    fireEvent.press(getByTestId("SearchButton"));

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
