import React from "react";

import { shallow, mount } from "enzyme";

import { Button } from "Components/common/button/button";

import { DISABLED } from "Src/constants";

describe("<Button />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            isDisabled: "",
            type: "btnBack",
            action: jest.fn(),
            newLocation: "#/new",
            ...newProps
        };

        wrapper = shallow(<Button {...props} />);
    };

    beforeEach(() => {
        setUpTest();
    });

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

    it("displays an enabled button", () => {
        expect(wrapper.find("button").props().disabled).toBeFalsy();
        expect(wrapper.find(".disabled")).toHaveLength(0);
    });

    it("calls the passed action and opens the new location", () => {
        wrapper.find("button").simulate("click");
        expect(props.action).toBeCalled();
        expect(location.hash).toEqual(props.newLocation);
    });

    it("calls the passed action, but doesn't open the new location, if no new location is passed", () => {
        setUpTest({
            newLocation: ""
        });

        wrapper.find("button").simulate("click");
        expect(props.action).toBeCalled();
        expect(location.hash).not.toEqual(props.newLocation);
    });

    describe("if disabled", () => {
        beforeEach(() => {
            setUpTest({
                isDisabled: DISABLED,
                newLocation: "#/notCalled"
            });
        });

        it("displays a disabled button", () => {
            expect(wrapper.find("button").props().disabled).toBeTruthy();
            expect(wrapper.find(".disabled")).toHaveLength(1);
        });

        it("doesn't call the passed action nor opens the new location", () => {
            wrapper = mount(<Button {...props} />);

            wrapper.find("button").simulate("click");
            expect(props.action).not.toBeCalled();
            expect(location.hash).not.toEqual(props.newLocation);
        });
    });
});