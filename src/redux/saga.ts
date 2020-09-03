import { CallEffect, ForkEffect, PutEffect, call, put, takeLatest, } from "redux-saga/effects";

import { SearchResponse, SearchErrorResponse, SearchOkResponse, api, } from "@api";
import { displayInfo, networkErrorHandler, } from "@utils";

import { SearchAction, SearchSuccessAction, SearchFailedAction, actionTypes, } from "./types";
import { actions, } from "./actions";

const infoTitle = "Something has gone wrong!";

export function* onSearch(action: SearchAction): Generator<CallEffect | PutEffect<SearchSuccessAction | SearchFailedAction>> {
  try {
    const response = (yield call(api.search, action.payload.title)) as SearchResponse;

    console.warn("search response", response);

    if (response.ok) {
      if (response.data?.Response === "True") {
        const movies = (response.data as SearchOkResponse).Search.map((item) => ({
          id: item.imdbID,
          poster: item?.Poster || "",
          title: item.Title,
        }));

        yield put(actions.searchSuccess(movies));
        console.warn("OK");
      } else {
        yield put(actions.searchFailed((response.data as SearchErrorResponse).Error || ""));
        console.warn("BAD");
      }
    } else {
      displayInfo(networkErrorHandler(response), infoTitle);
      yield put(actions.searchFailed(""));
    }
  } catch (error) {
    console.warn("onSearch error=", error);
    displayInfo((error as Error).message, infoTitle);
    yield put(actions.searchFailed(""));
  }
}

export default function* saga(): Generator<ForkEffect> {
  yield takeLatest(actionTypes.SEARCH_REQUEST, onSearch);
}
