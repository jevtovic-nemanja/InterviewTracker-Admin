import React from "react";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import { HashRouter, NavLink } from "react-router-dom";

import Header from "Containers/common/header/header";
import styles from "./header.css";

import { goToReportsList, goToCreateReport } from "Store/actions";

import { Routes } from "Src/constants";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({ ...props });

describe("<Header />", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockedStore(
            createTestState()
        );
        wrapper = mount(
            <HashRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </HashRouter>
        );
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