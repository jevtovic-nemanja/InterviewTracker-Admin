import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Input } from "./input";

describe("<Input />", () => {
    let wrapper;

    const mockedProps = {
        inputItem: "text",
        receiveInputChange: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Input {...mockedProps} />);
    });

    it("displays the passed value", () => {
        expect(wrapper.find("input").prop("value")).toEqual(mockedProps.inputItem);
    });

    it("calls the onChange handler", () => {
        wrapper.find("input").simulate("change");
        expect(mockedProps.receiveInputChange).toHaveBeenCalledTimes(1);
    })
});