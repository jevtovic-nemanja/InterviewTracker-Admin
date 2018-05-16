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

import App from "Src/app";


import { rootReducer } from "Store/reducers";
import { rootSaga } from "Store/sagas";
import { startFetchData } from "Store/actions";

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