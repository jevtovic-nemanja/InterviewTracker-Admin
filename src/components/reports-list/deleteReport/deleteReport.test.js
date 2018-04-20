import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { DeleteReport } from "./deleteReport";

describe("<DeleteReport />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<DeleteReport />);
    });

    it("displays error message if it exists", () => {
        const text = "text";

        wrapper.setProps({
            message: text
        });

        expect(wrapper.find("p").text()).toEqual(text);
        expect(wrapper.find("button")).toHaveLength(1);
    });

    it("displays default delete modal if there is no error message", () => {
        wrapper.setProps({
            message: ""
        });

        expect(wrapper.find("p").text()).toEqual("Are you sure you wish to delete this report?");
        expect(wrapper.find("button")).toHaveLength(2);
    });
});