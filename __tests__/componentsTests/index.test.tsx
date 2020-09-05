import React from "react";
import configureStore from "redux-mock-store";
import { Provider, } from "react-redux";
import { render, fireEvent, } from "@testing-library/react-native";

import { LoadingIndicator, Poster, SearchBar, } from "@components";
import { SearchButton, } from "@src/components/SearchBar/components";

import snapshotTest from "../snapshotTestUtil";
import { mockedActions, mockedData, } from "../mockedData";

const mockStore = configureStore([]);

describe("components tests", () => {
  test("LoadingIndicator must renders correctly", () => {
    snapshotTest(<LoadingIndicator />);
  });

  test("Poster must renders correctly with set poster and size = 'small'", () => {
    snapshotTest(<Poster poster={mockedData.movies[0].poster} size="small" />);
  });

  test("Poster must renders correctly with set poster and size = 'large'", () => {
    snapshotTest(<Poster poster={mockedData.movies[0].poster} size="large" />);
  });

  test("Poster must renders correctly without set poster and size = 'small'", () => {
    snapshotTest(<Poster poster="" size="small" />);
  });

  test("Poster must renders correctly without set poster and size = 'large'", () => {
    snapshotTest(<Poster poster="" size="large" />);
  });

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

  test("SearchBar must start search", () => {
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
});
