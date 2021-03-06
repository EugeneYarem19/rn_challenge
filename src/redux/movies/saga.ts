import {
  CallEffect,
  ForkEffect,
  PutEffect,
  SelectEffect,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";

import { SearchResponse, MovieResponse, fetchMoreMovie, fetchMovie, getSearchResult, } from "@api";
import {
  displayInfo,
  responseHandler,
  onFetchMovieFailed,
  onFetchMovieSuccess,
  onSearchFailed,
  onSearchSuccess,
} from "@utils";

import {
  FetchMoreFailedAction,
  FetchMovieAction,
  FetchMovieFailedAction,
  Movie,
  ResponseHandlerReturnType,
  SearchAction,
  SearchFailedAction,
} from "../types";
import { actionTypes, actions, } from "./actions";
import { errors, } from "@src/constants";
import { selectors, } from "./selectors";

export function* onFetchMore(): Generator<
  SelectEffect | CallEffect | ResponseHandlerReturnType | PutEffect<FetchMoreFailedAction>
> {
  try {
    const title = (yield select(selectors.getCurrentSearchTitle)) as string;
    const nextPage = (yield select(selectors.getNextSearchPage)) as number;

    const response = (yield call(fetchMoreMovie, title, nextPage)) as SearchResponse;

    yield responseHandler(
      response,
      onSearchSuccess(actions.fetchMoreSuccess),
      onSearchFailed(actions.fetchMoreFailed),
      actions.fetchMoreFailed
    );
  } catch (error) {
    displayInfo((error as Error).message, errors.infoTitle);
    yield put(actions.fetchMoreFailed(""));
  }
}

export function* onSearch(
  action: SearchAction
): Generator<CallEffect | ResponseHandlerReturnType | PutEffect<SearchFailedAction>> {
  try {
    const response = (yield call(getSearchResult, action.payload.title)) as SearchResponse;

    yield responseHandler(
      response,
      onSearchSuccess(actions.searchSuccess),
      onSearchFailed(actions.searchFailed),
      actions.searchFailed
    );
  } catch (error) {
    displayInfo((error as Error).message, errors.infoTitle);
    yield put(actions.searchFailed(""));
  }
}

export function* onFetchMovie(
  action: FetchMovieAction
): Generator<
  SelectEffect | CallEffect | ResponseHandlerReturnType | PutEffect<FetchMovieFailedAction>
> {
  try {
    const id = action.payload.id;

    const currentMovies = (yield select(selectors.getMovies)) as Movie[];
    const requestedMovie = currentMovies.find((item) => item.id === id);

    // this is condition to cancel requesting the movie if it is requested before
    if (requestedMovie?.cast) {
      yield put(actions.fetchMovieFailed());
      return;
    }

    const response = (yield call(fetchMovie, id)) as MovieResponse;

    yield responseHandler(
      response,
      onFetchMovieSuccess(id, actions.fetchMovieSuccess),
      onFetchMovieFailed(actions.fetchMovieFailed),
      actions.fetchMovieFailed
    );
  } catch (error) {
    displayInfo((error as Error).message, errors.infoTitle);
    yield put(actions.fetchMovieFailed());
  }
}

export default function* saga(): Generator<ForkEffect> {
  yield takeLatest(actionTypes.SEARCH_REQUEST, onSearch);
  yield takeLatest(actionTypes.FETCH_MORE_REQUEST, onFetchMore);
  yield takeLatest(actionTypes.FETCH_MOVIE_REQUEST, onFetchMovie);
}
