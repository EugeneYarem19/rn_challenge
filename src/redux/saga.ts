import { CallEffect, ForkEffect, PutEffect, call, put, select, takeLatest, SelectEffect, } from "redux-saga/effects";

import { ErrorResponse, IResponse, SearchResponse, SearchOkResponse, api, MovieResponse, MovieOkResponse, } from "@api";
import { displayInfo, networkErrorHandler, } from "@utils";

import {
  FetchMoreSuccessAction,
  FetchMoreFailedAction,
  FetchMovieAction,
  IAction,
  Movie,
  SearchAction,
  SearchSuccessAction,
  SearchFailedAction,
  actionTypes,
  FetchMovieFailedAction,
  FetchMovieSuccessAction,
  MovieDetailing,
} from "./types";
import { actions, } from "./actions";
import { selectors, } from "./selectors";

const infoTitle = "Something has gone wrong!";

type ResponseHandlerReturnType = Generator;

function* responseHandler<T extends IResponse, U extends IAction>(
  response: T,
  onSuccess: (apiResponse: T) => Generator,
  onFailed: (apiResponse: T) => Generator,
  failed: (errorMessage: string) => U
): ResponseHandlerReturnType {
  try {
    if (response.ok) {
      if (response.data?.Response === "True") {
        yield onSuccess(response);
      } else {
        yield onFailed(response);
      }
    } else {
      displayInfo(networkErrorHandler(response), infoTitle);
      yield put(failed(""));
    }
  } catch (error) {
    console.warn("responseHandler error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(failed(""));
  }
}

const onSearchSuccess = (success: typeof actions.searchSuccess) => {
  return function* (response: SearchResponse): Generator<SelectEffect | PutEffect<SearchSuccessAction | FetchMoreSuccessAction>> {
    const movies = (response.data as SearchOkResponse).Search.map((item) => ({
      id: item.imdbID,
      poster: item?.Poster || "",
      title: item.Title,
    }));

    const currentMovies = (yield select(selectors.getMovies)) as Movie[];
    const isThatsAll = currentMovies.length + movies.length === Number.parseInt((response.data as SearchOkResponse).totalResults, 10);

    yield put(success(movies, isThatsAll));
    console.warn("OK");
  };
};

const onSearchFailed = (failed: typeof actions.searchFailed) => {
  return function* (response: SearchResponse): Generator<PutEffect<SearchFailedAction | FetchMoreFailedAction>> {
    yield put(failed((response.data as ErrorResponse).Error || ""));
    console.warn("BAD");
  };
};

export function* onFetchMore(): Generator<SelectEffect | CallEffect | ResponseHandlerReturnType | PutEffect<FetchMoreFailedAction>> {
  try {
    const title = (yield select(selectors.getCurrentSearchTitle)) as string;
    const nextPage = (yield select(selectors.getNextSearchPage)) as number;

    const response = (yield call(api.fetchMore, title, nextPage)) as SearchResponse;

    console.warn("fetch more response", response);

    yield responseHandler(response, onSearchSuccess(actions.fetchMoreSuccess), onSearchFailed(actions.fetchMoreFailed), actions.fetchMoreFailed);
  } catch (error) {
    console.warn("onFetchMore error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.fetchMoreFailed(""));
  }
}

export function* onSearch(action: SearchAction): Generator<CallEffect | ResponseHandlerReturnType | PutEffect<SearchFailedAction>> {
  try {
    const response = (yield call(api.search, action.payload.title)) as SearchResponse;

    console.warn("search response", response);

    yield responseHandler(response, onSearchSuccess(actions.searchSuccess), onSearchFailed(actions.searchFailed), actions.searchFailed);
  } catch (error) {
    console.warn("onSearch error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.searchFailed(""));
  }
}

const onFetchMovieSuccess = (id: string, success: typeof actions.fetchMovieSuccess) => {
  return function* (response: MovieResponse): Generator<PutEffect<FetchMovieSuccessAction>> {
    const movie = response.data as MovieOkResponse;

    const detailed: MovieDetailing = {
      genre: movie.Genre,
      director: movie.Director,
      fullPlot: movie.Plot,
      cast: movie.Actors,
      ratings: movie.Ratings.map((item) => ({
        source: item.Source,
        value: item.Value,
      })),
    };

    yield put(success(id, detailed));
    console.warn("OK");
  };
};

const onFetchMovieFailed = (failed: typeof actions.fetchMovieFailed) => {
  return function* (response: MovieResponse): Generator<PutEffect<FetchMovieFailedAction>> {
    yield put(failed());
    // TODO: message move to constants
    displayInfo("We cannot fetch detailed information about this movie. Error: \n" + (response.data as ErrorResponse).Error, infoTitle);
    console.warn("BAD");
  };
};

export function* onFetchMovie(action: FetchMovieAction): Generator<SelectEffect | CallEffect | ResponseHandlerReturnType | PutEffect<FetchMovieFailedAction>> {
  try {
    const id = action.payload.id;

    const currentMovies = (yield select(selectors.getMovies)) as Movie[];
    const requestedMovie = currentMovies.find((item) => item.id === id);

    // this is condition to cancel requesting the movie if it is requested before
    if (requestedMovie?.cast) {
      console.warn("request was canceled, because this movie was fetched earlier");
      yield put(actions.fetchMovieFailed());
      return;
    }

    const response = (yield call(api.fetchMovie, id)) as MovieResponse;

    console.warn("fetch movie response", response);

    yield responseHandler(response, onFetchMovieSuccess(id, actions.fetchMovieSuccess), onFetchMovieFailed(actions.fetchMovieFailed), actions.fetchMovieFailed);
  } catch (error) {
    console.warn("onFetchMovie error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.fetchMovieFailed());
  }
}

export default function* saga(): Generator<ForkEffect> {
  yield takeLatest(actionTypes.SEARCH_REQUEST, onSearch);
  yield takeLatest(actionTypes.FETCH_MORE_REQUEST, onFetchMore);
  yield takeLatest(actionTypes.FETCH_MOVIE_REQUEST, onFetchMovie);
}
