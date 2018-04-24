import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Input } from "./input";

describe("<Input />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Input />);
    });

    it("should display the passed value", () => {
        const text = "text";

        wrapper.setProps({
            inputItem: text
        });

        expect(wrapper.find("input").prop("value")).toEqual(text);
    });

    it("should display what the user types in", () => {
        const text = "text";
        const newText = "newText";
        const mockedEvent = {
            target: {
                value: newText
            }
        };

        const receiveInputChange = jest.fn(event => {
            wrapper.setProps({
                inputItem: event.target.value
            });
        });
        
        wrapper.setProps({
            inputItem: text,
            receiveInputChange: receiveInputChange
        });

        wrapper.find("input").simulate("change", mockedEvent);

        expect(wrapper.find("input").prop("value")).toEqual(newText);
    })
});