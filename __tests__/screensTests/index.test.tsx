import React from "react";
import configureStore from "redux-mock-store";
import { Provider, } from "react-redux";
import { StackActions, } from "@react-navigation/native";
import { render, fireEvent, } from "@testing-library/react-native";

import { MovieScreen, SearchScreen, } from "@screens";
import { DetailsItem, Rating, } from "@src/screens/MovieScreen/components";
import { SearchResultItem, } from "@src/screens/SearchScreen/components";

import snapshotTest from "../snapshotTestUtil";
import { mockedData, } from "../mockedData";

jest.mock("@react-navigation/native", () => ({
  __esModule: true,
  StackActions: { push: jest.fn(), },
}));

const mockStore = configureStore([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: any = {};

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
        <SearchScreen {...props} />
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
        <SearchScreen {...props} />
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
        <SearchScreen {...props} />
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
        <SearchScreen {...props} />
      </Provider>
    );
  });

  test("Must go to MovieScreen on search results item press", () => {
    const store = mockStore({
      isFetchingMore: true,
      isSearching: false,
      isThatsAll: false,
      searchErrorMessage: "",
      foundMovies: mockedData.movies,
    });

    const dispatch = jest.fn();
    const navigation = { dispatch, };

    const { getByTestId, } = render(
      <Provider store={store}>
        <SearchScreen navigation={navigation} />
      </Provider>
    );

    fireEvent.press(getByTestId(mockedData.id));

    expect(dispatch).toHaveBeenCalled();
    expect(StackActions.push).toBeCalledWith("Movie", { id: mockedData.id, title: mockedData.title, });
  });

  test("DetailsItem must renders correctly", () => {
    snapshotTest(<DetailsItem title="title" value="value" />);
  });

  test("Rating must renders correctly", () => {
    snapshotTest(<Rating ratings={[{ source: "source", value: "value", },]} />);
  });

  test("MovieScreen must renders correctly with all props", () => {
    const store = mockStore({
      isFetchingMovie: false,
      foundMovies: [
        {
          id: mockedData.id,
          poster: "http://",
          title: "Title",
          genre: "Genre",
          director: "Director",
          fullPlot: "Plot",
          cast: "Cast",
          ratings: [{ source: "source", value: "value", },],
        },
      ],
    });
    snapshotTest(
      <Provider store={store}>
        <MovieScreen {...props} route={{ params: { id: mockedData.id, title: mockedData.title, }, }} />
      </Provider>
    );
  });

  test("MovieScreen must display loading indicator", () => {
    const store = mockStore({
      isFetchingMovie: true,
      foundMovies: [
        {
          id: mockedData.id,
          poster: "http://",
          title: "Title",
        },
      ],
    });
    snapshotTest(
      <Provider store={store}>
        <MovieScreen {...props} route={{ params: { id: mockedData.id, title: mockedData.title, }, }} />
      </Provider>
    );
  });
});
