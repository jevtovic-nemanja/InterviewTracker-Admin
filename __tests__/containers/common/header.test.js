import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

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
        wrapper = shallow(<Header store={store} hash={`#${Routes.REPORTS_LIST}`} />).dive();
    });

    it("displays one active and one inactive link", () => {
        expect(wrapper.find(`.${styles.btnNav}`)).toHaveLength(1);
        expect(wrapper.find(`.${styles.btnNavActive}`)).toHaveLength(1);
    });

    it("displays the correct active link", () => {
        expect(wrapper.find(`.${styles.btnNavActive}`).text()).toEqual("Reports");

        wrapper.setProps({
            hash: `"#${Routes.CREATE_REPORT_CANDIDATES}"`
        });

        expect(wrapper.find(`.${styles.btnNavActive}`).text()).toEqual("Create Report");
    });

    it("calls the navigation functions when clicked", () => {
        wrapper.find(".reports").simulate("click");
        expect(store.getActions()).toEqual([goToReportsList()]);

        store.clearActions();

        wrapper.find(".create-report").simulate("click");
        expect(store.getActions()).toEqual([goToCreateReport()]);
    });
});