import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";

import {
    createStore,
    applyMiddleware,
    compose
} from "redux";

import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import App from "./app";


import { rootReducer } from "./store/reducers/index";
import { rootSaga } from "./store/sagas/index";
import { startFetchData } from "./store/actions/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware, logger)
));

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.querySelector(".app")
);