import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, } from "redux";
import { composeWithDevTools, } from "redux-devtools-extension";

import { initState, moviesReducer, moviesSaga, } from "./movies";

const saga = createSagaMiddleware();

const store = createStore(moviesReducer, initState, composeWithDevTools(applyMiddleware(saga)));
saga.run(moviesSaga);

export default store;
