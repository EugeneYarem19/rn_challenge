import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, } from "redux";
import { composeWithDevTools, } from "redux-devtools-extension";

import Reducer from "./reducer";
import Saga from "./saga";
import { initState, } from "./types";

const saga = createSagaMiddleware();

const store = createStore(Reducer, initState, composeWithDevTools(applyMiddleware(saga)));
saga.run(Saga);

export default store;
