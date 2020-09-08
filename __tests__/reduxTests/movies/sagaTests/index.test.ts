import { expectSaga, } from "redux-saga-test-plan";

import Saga from "@src/redux/movies/saga";
import { getSearchResult, } from "@api";
import { selectors, } from "@src/redux/movies/selectors";

import { mockedActions, } from "@tests/__mocks__";

describe("Movies saga tests", () => {
  describe("main Saga tests", () => {
    test("must call onSearch saga on SEARCH_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.findMoviesAction)
        .call.like({ fn: getSearchResult, }) // call of onSearch saga can be tested by first call effect in onSearch saga
        .silentRun();
    });

    test("must call onFetchMore saga on FETCH_MORE_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.fetchMoreAction)
        .select.like({ selector: selectors.getCurrentSearchTitle, }) // call of onFetchMore saga can be tested by first select effect in onFetchMore saga
        .silentRun();
    });

    test("must call onFetchMovie saga on FETCH_MOVIE_REQUEST", () => {
      return expectSaga(Saga)
        .dispatch(mockedActions.fetchMovieAction)
        .select.like({ selector: selectors.getMovies, }) // call of onFetchMovie saga can be tested by first select effect in onFetchMovie saga
        .silentRun();
    });
  });
});
