import React from "react";

import { shallow } from "enzyme";

import configureStore from "redux-mock-store";

import Search from "Containers/common/search/search";
import { receiveInputChange } from "Store/actions";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

describe("<Search />", () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockedStore({
            searchItem: "text"
        });

        wrapper = shallow(<Search store={store} />).dive();
    });

    it("displays the passed value", () => {
        expect(wrapper.find("input").props().value).toEqual(store.getState().searchItem);
    });

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