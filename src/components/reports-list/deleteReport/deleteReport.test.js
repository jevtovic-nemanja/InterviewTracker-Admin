import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { DeleteReport } from "./deleteReport";

describe("<DeleteReport />", () => {
    let wrapper;

    const mockedText = "text";

    const mockedEvent = {
        target: {}
    }

    const mockedProps = {
        deleteReport: jest.fn(),
        message: "",
        close: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<DeleteReport {...mockedProps} />);
    });

    it("displays error message if it exists", () => {
        wrapper.setProps({
            message: mockedText
        });

        expect(wrapper.find("p").text()).toEqual(mockedText);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("displays default delete modal if there is no error message", () => {
        expect(wrapper.find("p").text()).toEqual("Are you sure you wish to delete this report?");
        expect(wrapper.find("button")).toHaveLength(2);
    });

    it("calls deleteReport function if delete button is clicked", () => {
        wrapper.find(".btn-delete").simulate("click", mockedEvent);
        expect(mockedProps.deleteReport).toHaveBeenCalledTimes(1);
    });

    it("calls close function if close button is clicked", () => {
        wrapper.find(".btn-close").simulate("click", mockedEvent);
        expect(mockedProps.close).toHaveBeenCalledTimes(1);

        wrapper.setProps({
            message: mockedText
        });

        wrapper.find(".btn-close").simulate("click", mockedEvent);
        expect(mockedProps.close).toHaveBeenCalledTimes(2);
    });
});