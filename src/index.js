import "@babel/polyfill";
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

import App from "Src/app";

import { rootReducer } from "Store/reducers";
import { rootSaga } from "Store/sagas";
import { startFetchData } from "Store/actions";

const setupStoreAndRenderApp = async () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const sagaMiddleware = createSagaMiddleware();

    const middleware = [sagaMiddleware];

    if (process.env.NODE_ENV === "development") {
        const logger = await import(/* webpackChunkName: "redux-logger" */ "redux-logger");
        middleware.push(logger.default);
    }

    const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(...middleware)
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
};

setupStoreAndRenderApp();