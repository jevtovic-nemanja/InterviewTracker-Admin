import "@babel/polyfill";

import React from "react";
import { render } from "react-dom";

import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "Store/store";

import App from "Src/app";

const renderApp = async () => {
    
    const store = await setupStore();

    render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>,
        document.querySelector(".app")
    );
};

renderApp();