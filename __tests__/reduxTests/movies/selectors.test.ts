import { initState, } from "@src/redux/movies";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedData, } from "@tests/__mocks__";

describe("Movies selectors tests", () => {
  test("must return currentSearchTitle from the state", () => {
    expect(
      selectors.getCurrentSearchTitle({ ...initState, currentSearchTitle: mockedData.title, })
    ).toEqual(mockedData.title);
  });

  test("must return foundMovies from the state", () => {
    expect(selectors.getMovies({ ...initState, foundMovies: mockedData.movies, })).toEqual(
      mockedData.movies
    );
  });

  test("must return nextSearchPage from the state", () => {
    expect(selectors.getNextSearchPage({ ...initState, nextSearchPage: 2, })).toEqual(2);
  });
});
