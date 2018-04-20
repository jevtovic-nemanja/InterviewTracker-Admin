import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Navbar } from "./navbar";

describe("<Navbar />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navbar />);
    });

    it("displays one active and one inactive link", () => {
        expect(wrapper.find(".btn-nav")).toHaveLength(1);
        expect(wrapper.find(".btn-nav-active")).toHaveLength(1);
    });

    it("displays the correct active link", () => {
        wrapper.setProps({
            hash: "#/"
        });

        expect(wrapper.find(".btn-nav-active").text()).toEqual("Reports");

        wrapper.setProps({
            hash: "#/create-report"
        });

        expect(wrapper.find(".btn-nav-active").text()).toEqual("Create Report");
    });

});