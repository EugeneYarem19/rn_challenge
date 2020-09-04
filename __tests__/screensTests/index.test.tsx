import React from "react";
import configureStore from "redux-mock-store";
import { Provider, } from "react-redux";
import { render, fireEvent, } from "@testing-library/react-native";

import { SearchScreen, } from "@screens";
import { SearchResultItem, } from "@src/screens/SearchScreen/components";

import snapshotTest from "../snapshotTestUtil";
import { mockedData, } from "../mockedData";

const mockStore = configureStore([]);

describe("screens tests", () => {
  test("SearchResultItem must renders correctly with poster", () => {
    snapshotTest(<SearchResultItem testID={mockedData.id} title={mockedData.title} poster={mockedData.movies[0].poster} onPress={() => null} />);
  });

  test("SearchResultItem must renders correctly without poster", () => {
    snapshotTest(<SearchResultItem testID={mockedData.id} title={mockedData.title} poster="" onPress={() => null} />);
  });

  test("SearchResultItem must be clickable", () => {
    const onPress = jest.fn();
    const { getByTestId, } = render(<SearchResultItem testID={mockedData.id} title={mockedData.title} poster="" onPress={onPress} />);

    fireEvent.press(getByTestId(mockedData.id));

    expect(onPress).toHaveBeenCalled();
  });

  test("SearchScreen must render loader if searching even if searchErrorMessage and movies presented", () => {
    const store = mockStore({
      isFetchingMore: false,
      isSearching: true,
      isThatsAll: false,
      searchErrorMessage: mockedData.errorMessage,
      foundMovies: mockedData.movies,
    });
    snapshotTest(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  });

  test("SearchScreen must display searchErrorMessage if error even if movies presented", () => {
    const store = mockStore({
      isFetchingMore: false,
      isSearching: false,
      isThatsAll: false,
      searchErrorMessage: mockedData.errorMessage,
      foundMovies: mockedData.movies,
    });
    snapshotTest(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  });

  test("SearchScreen must render movies list", () => {
    const store = mockStore({
      isFetchingMore: false,
      isSearching: false,
      isThatsAll: false,
      searchErrorMessage: "",
      foundMovies: mockedData.movies,
    });
    snapshotTest(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  });

  test("SearchScreen must render movies list and bottom loader", () => {
    const store = mockStore({
      isFetchingMore: true,
      isSearching: false,
      isThatsAll: false,
      searchErrorMessage: "",
      foundMovies: mockedData.movies,
    });
    snapshotTest(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );
  });
});
