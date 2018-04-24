import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Navbar } from "./navbar";

describe("<Navbar />", () => {
    let wrapper;

    const mockedEvent = {
        target: {}
    }

    const mockedProps = {
        hash: "#/",
        goToReportsList: jest.fn(),
        goToCreateReport: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Navbar {...mockedProps} />);
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
        wrapper.find(".reports").simulate("click", mockedEvent);
        expect(mockedProps.goToReportsList).toHaveBeenCalledTimes(1);

        wrapper.find(".create-report").simulate("click", mockedEvent);
        expect(mockedProps.goToCreateReport).toHaveBeenCalledTimes(1);
    });

});