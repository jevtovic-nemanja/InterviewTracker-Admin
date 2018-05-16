import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Search from "./search";
import { receiveInputChange } from "Store/actions/index";

describe("<Search />", () => {
    let wrapper;
    let store;

    const mockedMiddleware = [];
    const mockedStore = configureStore(mockedMiddleware);

    beforeEach(() => {
        const mockedState = {
            searchItem: "text",
        };

        store = mockedStore(mockedState);
        wrapper = shallow(<Search store={store} />).dive();
    });

    it("displays the passed value", () => {
        expect(wrapper.find("input").props().value).toEqual(wrapper.instance().props.searchItem);
    })

    it("calls the filter function with what the user types in", () => {
        const mockedEvent = {
            target: {
                value: "Text"
            }
        };

        wrapper.find("input").simulate("change", mockedEvent);
        expect(store.getActions()).toEqual([receiveInputChange(mockedEvent.target.value.toLowerCase())]);
    });
});