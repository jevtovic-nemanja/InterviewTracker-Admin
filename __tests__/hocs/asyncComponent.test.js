import React from "react";

import { mount, shallow } from "enzyme";

import { asyncComponent } from "Hocs/asyncComponent/asyncComponent";

const ComponentAsync = asyncComponent(() => {
    return import("./testableComponent");
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