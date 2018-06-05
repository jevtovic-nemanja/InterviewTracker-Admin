import React from "react";

import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import Component from "../__test__/testableComponent";
import { asyncComponent } from "./asyncComponent";

const ComponentAsync = asyncComponent(() => {
    return import("../__test__/testableComponent");
});

describe("asyncComponent()", () => {

    describe("when the wrapped component is not mounted", () => {
        const wrapper = shallow(<ComponentAsync />);

        it("should not render anything", () => {
            expect(wrapper.html()).toBeNull();
        });
    });

    describe("when the wrapped component is mounted", () => {
        const wrapper = mount(<ComponentAsync />);

        it("should render the wrapped component", () => {
            expect(wrapper.html()).not.toBeNull();
        });
    });
});