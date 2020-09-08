import React from "react";
import configureStore from "redux-mock-store";
import { Provider, } from "react-redux";

import { MovieScreen, } from "@screens";
import { DetailsItem, Rating, } from "@src/screens/MovieScreen/components";

import { mockedData, } from "@tests/__mocks__";
import { snapshotTest, } from "@tests/__utils__";

const mockStore = configureStore([]);
const props: any = {};

describe("MovieScreen tests", () => {
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
        <MovieScreen
          {...props}
          route={{ params: { id: mockedData.id, title: mockedData.title, }, }}
        />
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
        <MovieScreen
          {...props}
          route={{ params: { id: mockedData.id, title: mockedData.title, }, }}
        />
      </Provider>
    );
  });
});
