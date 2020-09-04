import { CallEffect, ForkEffect, PutEffect, call, put, select, takeLatest, SelectEffect, } from "redux-saga/effects";

import { SearchResponse, SearchErrorResponse, SearchOkResponse, api, } from "@api";
import { displayInfo, networkErrorHandler, } from "@utils";

import { FetchMoreSuccessAction, FetchMoreFailedAction, Movie, SearchAction, SearchSuccessAction, SearchFailedAction, actionTypes, } from "./types";
import { actions, } from "./actions";
import { selectors, } from "./selectors";

const infoTitle = "Something has gone wrong!";

type SearchResponseHandlerReturnType = Generator<
  SelectEffect | PutEffect<FetchMoreSuccessAction | FetchMoreFailedAction | SearchSuccessAction | SearchFailedAction>
>;

function* searchResponseHandler(
  response: SearchResponse,
  success: (movies: Movie[], isThatsAll: boolean) => SearchSuccessAction | FetchMoreSuccessAction,
  failed: (errorMessage: string) => SearchFailedAction | FetchMoreFailedAction
): SearchResponseHandlerReturnType {
  try {
    if (response.ok) {
      if (response.data?.Response === "True") {
        const movies = (response.data as SearchOkResponse).Search.map((item) => ({
          id: item.imdbID,
          poster: item?.Poster || "",
          title: item.Title,
        }));

        const currentMovies = (yield select(selectors.getMovies)) as Movie[];
        const isThatsAll = currentMovies.length + movies.length === Number.parseInt((response.data as SearchOkResponse).totalResults, 10);

        yield put(success(movies, isThatsAll));
        console.warn("OK");
      } else {
        yield put(failed((response.data as SearchErrorResponse).Error || ""));
        console.warn("BAD");
      }
    } else {
      displayInfo(networkErrorHandler(response), infoTitle);
      yield put(failed(""));
    }
  } catch (error) {
    console.warn("searchResponseHandler error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(failed(""));
  }
}

export function* onFetchMore(): Generator<SelectEffect | CallEffect | SearchResponseHandlerReturnType | PutEffect<FetchMoreFailedAction>> {
  try {
    const title = (yield select(selectors.getCurrentSearchTitle)) as string;
    const nextPage = (yield select(selectors.getNextSearchPage)) as number;

    const response = (yield call(api.fetchMore, title, nextPage)) as SearchResponse;

    console.warn("fetch more response", response);

    yield searchResponseHandler(response, actions.fetchMoreSuccess, actions.fetchMoreFailed);
  } catch (error) {
    console.warn("onFetchMore error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.fetchMoreFailed(""));
  }
}

export function* onSearch(action: SearchAction): Generator<CallEffect | SearchResponseHandlerReturnType | PutEffect<SearchFailedAction>> {
  try {
    const response = (yield call(api.search, action.payload.title)) as SearchResponse;

    console.warn("search response", response);

    yield searchResponseHandler(response, actions.searchSuccess, actions.searchFailed);
  } catch (error) {
    console.warn("onSearch error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.searchFailed(""));
  }
}

export default function* saga(): Generator<ForkEffect> {
  yield takeLatest(actionTypes.SEARCH_REQUEST, onSearch);
  yield takeLatest(actionTypes.FETCH_MORE_REQUEST, onFetchMore);
}
