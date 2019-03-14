import React from "react";

import { mount, shallow } from "enzyme";

import { asyncComponent } from "Hocs/asyncComponent/asyncComponent";

const ComponentAsync = asyncComponent(() => {
    return import("./testableComponent");
});

describe("asyncComponent()", () => {

    it("should not render anything when the wrapped component is not mounted", () => {
        const wrapper = shallow(<ComponentAsync />);

        expect(wrapper.html()).toBeNull();
    });

    describe("when the wrapped component is mounted", () => {
        const wrapper = mount(<ComponentAsync />);

        it("should asynchronously render the wrapped component", () => {
            expect(wrapper.html()).not.toBeNull();
        });
    });
});