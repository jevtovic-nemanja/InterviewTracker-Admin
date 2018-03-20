import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import "babel-polyfill";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as reducers from "./store/reducers";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";

import { startFetchReports, startFetchCandidates, startFetchCompanies } from "./store/actions";

import logger from "redux-logger";

import App from "./components/app";

const rootReducer = combineReducers(reducers);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.querySelector(".app")
);

store.dispatch(startFetchReports());
store.dispatch(startFetchCandidates());
store.dispatch(startFetchCompanies());