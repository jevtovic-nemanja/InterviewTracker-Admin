import {
    createStore,
    applyMiddleware,
    compose
} from "redux";

import createSagaMiddleware from "redux-saga";

import { rootReducer } from "Store/reducers";
import { rootSaga } from "Store/sagas";

export const setupStore = async () => {

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

    return store;
};