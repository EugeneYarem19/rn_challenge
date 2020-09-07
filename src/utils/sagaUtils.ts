import { PutEffect, SelectEffect, put, select, } from "redux-saga/effects";

import { ErrorResponse, IResponse, MovieResponse, MovieOkResponse, SearchResponse, SearchOkResponse, } from "@api";
import {
  FetchMoreFailedAction,
  FetchMoreSuccessAction,
  FetchMovieFailedAction,
  FetchMovieSuccessAction,
  IAction,
  Movie,
  MovieDetailing,
  ResponseHandlerReturnType,
  SearchFailedAction,
  SearchSuccessAction,
  moviesActions,
} from "@redux";
import { displayInfo, networkErrorHandler, } from "@utils";
import { errors, } from "@src/constants";
import { selectors, } from "@src/redux/movies/selectors";

export function* responseHandler<T extends IResponse, U extends IAction>(
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
      displayInfo(networkErrorHandler(response), errors.infoTitle);
      yield put(failed(""));
    }
  } catch (error) {
    console.warn("responseHandler error=", error);
    displayInfo((error as Error).message, errors.infoTitle);
    yield put(failed(""));
  }
}
export const onFetchMovieFailed = (failed: typeof moviesActions.fetchMovieFailed) => {
  return function* (response: MovieResponse): Generator<PutEffect<FetchMovieFailedAction>> {
    yield put(failed());
    displayInfo(errors.infoDescription + (response.data as ErrorResponse).Error, errors.infoTitle);
    console.warn("BAD");
  };
};

export const onFetchMovieSuccess = (id: string, success: typeof moviesActions.fetchMovieSuccess) => {
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

export const onSearchFailed = (failed: typeof moviesActions.searchFailed) => {
  return function* (response: SearchResponse): Generator<PutEffect<SearchFailedAction | FetchMoreFailedAction>> {
    yield put(failed((response.data as ErrorResponse).Error || ""));
    console.warn("BAD");
  };
};

export const onSearchSuccess = (success: typeof moviesActions.searchSuccess) => {
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
