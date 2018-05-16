import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Header from "./header";
import { goToReportsList, goToCreateReport } from "Store/actions";

describe("<Header />", () => {
    let wrapper;
    let store;

    const mockedMiddleware = [];
    const mockedStore = configureStore(mockedMiddleware);

    beforeEach(() => {
        store = mockedStore({});
        wrapper = shallow(<Header store={store} hash="#/" />).dive();
    });

    it("displays one active and one inactive link", () => {
        expect(wrapper.find(".btn-nav")).toHaveLength(1);
        expect(wrapper.find(".btn-nav-active")).toHaveLength(1);
    });

    it("displays the correct active link", () => {
        expect(wrapper.find(".btn-nav-active").text()).toEqual("Reports");

        wrapper.setProps({
            hash: "#/create-report"
        });

        expect(wrapper.find(".btn-nav-active").text()).toEqual("Create Report");
    });

    it("calls the navigation functions when clicked", () => {
        wrapper.find(".reports").simulate("click");
        expect(store.getActions()).toEqual([goToReportsList()]);

        store.clearActions();

        wrapper.find(".create-report").simulate("click");
        expect(store.getActions()).toEqual([goToCreateReport()]);
    });
});