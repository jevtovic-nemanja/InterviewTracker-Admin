import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Search } from "./search";

describe("<Search />", () => {
    let wrapper;

    const mockedEvent = {
        target: {
            value: "Text"
        }
    };

    beforeEach(() => {
        const mockedProps = {
            searchItem: "",
            filter: jest.fn(searchItem => { })
        };

        wrapper = shallow(<Search {...mockedProps} />);
    });

    it("displays the passed value", () => {
        expect(wrapper.find("input").props().value).toEqual(wrapper.instance().props.searchItem);
    })

    it("calls the filter function with what the user types in", () => {
        wrapper.find("input").simulate("change", mockedEvent);
        expect(wrapper.instance().props.filter).toHaveBeenCalledWith(mockedEvent.target.value.toLowerCase());
    });
});