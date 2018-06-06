import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { Button } from "Components/common/button/button";

import { DISABLED } from "Src/constants";

const createTestProps = props => ({
    isDisabled: "",
    type: "btnBack",
    action: jest.fn(),
    newLocation: "#/new",
    ...props
});

describe("<Button />", () => {

    describe("always", () => {
        const props = createTestProps();
        const wrapper = shallow(<Button {...props} />);

        it("displays the correct element with the correct labels", () => {
            expect(wrapper.find("button")).toHaveLength(1);
            expect(wrapper.find("button").text()).toEqual("Back");

            wrapper.setProps({
                type: "btnNext"
            });
            expect(wrapper.find("button").text()).toEqual("Next");

            wrapper.setProps({
                type: "btnSubmit"
            });
            expect(wrapper.find("button").text()).toEqual("Submit");
        });
    });

    describe("if enabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<Button {...props} />);
        });

        it("displays an enabled button", () => {
            expect(wrapper.find("button").props().disabled).toBeFalsy();
            expect(wrapper.find(".disabled")).toHaveLength(0);
        });

        it("calls the passed action and opens the new location", () => {
            wrapper.find("button").simulate("click");
            expect(props.action).toBeCalled();
            expect(location.hash).toEqual(props.newLocation);
        });
    });

    describe("if disabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps({
                isDisabled: DISABLED,
                newLocation: "#/notCalled"
            });
            wrapper = mount(<Button {...props} />);
        });

        it("displays a disabled button", () => {
            expect(wrapper.find("button").props().disabled).toBeTruthy();
            expect(wrapper.find(".disabled")).toHaveLength(1);
        });

        it("doesn't call the passed action nor opens the new location", () => {
            wrapper.find("button").simulate("click");
            expect(props.action).not.toBeCalled();
            expect(location.hash).not.toEqual(props.newLocation);
        });
    })

    describe("if no new location is passed", () => {
        const props = createTestProps({
            newLocation: ""
        });
        const wrapper = shallow(<Button {...props} />);

        it("calls the passed action, but doesn't open the new location", () => {
            wrapper.find("button").simulate("click");
            expect(props.action).toBeCalled();
            expect(location.hash).not.toEqual(props.newLocation);
        });
    });
});