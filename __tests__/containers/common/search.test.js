import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Search from "Containers/common/search/search";
import { receiveInputChange } from "Store/actions";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({
    searchItem: "text",
    ...props
});

describe("<Search />", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockedStore(
            createTestState()
        );
        wrapper = shallow(<Search store={store} />).dive();
    });

    it("displays the passed value", () => {
        expect(wrapper.find("input").props().value).toEqual(store.getState().searchItem);
    })

    it("calls sends what the user types in to the store", () => {
        const mockedEvent = {
            target: {
                value: "Text"
            }
        };

        wrapper.find("input").simulate("change", mockedEvent);
        expect(store.getActions()).toEqual([receiveInputChange(mockedEvent.target.value.toLowerCase())]);
    });
});