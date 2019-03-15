import React from "react";

import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { HashRouter, NavLink } from "react-router-dom";

import Header from "Containers/common/header/header";
import styles from "./header.css";

import { goToReportsList, goToCreateReport } from "Store/actions";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

describe("<Header />", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockedStore();

        wrapper = mount(
            <HashRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </HashRouter>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("renders the correct elements", () => {
        expect(wrapper.find("nav")).toHaveLength(1);
        expect(wrapper.find("h4")).toHaveLength(2);
        expect(wrapper.find(NavLink)).toHaveLength(2);
        expect(wrapper.find("button")).toHaveLength(2);
    });

    it("displays one active and one inactive link", () => {
        expect(wrapper.find(`a.${styles.navLink}`)).toHaveLength(2);
        expect(wrapper.find(`a.${styles.navLinkActive}`)).toHaveLength(1);
    });

    it("calls the navigation functions when clicked", () => {
        wrapper.find(".reports").simulate("click");
        expect(store.getActions()).toEqual([goToReportsList()]);

        store.clearActions();

        wrapper.find(".create-report").simulate("click");
        expect(store.getActions()).toEqual([goToCreateReport()]);
    });
});