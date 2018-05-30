import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { SubmitButton } from "./submitButton";

import { DISABLED } from "Src/constants";

const createTestProps = props => ({
    declined: "",
    onSubmit: jest.fn(),
    ...props
});

describe("<SubmitButton />", () => {

    describe("if enabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<SubmitButton {...props} />);
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("button")).toHaveLength(1);
            expect(wrapper.find("button").text()).toEqual("Submit");
            expect(wrapper.find("button").props().disabled).toBeFalsy();
            expect(wrapper.find(".disabled")).toHaveLength(0);
        });

        it("calls onSubmit on click", () => {
            wrapper.find("button").simulate("click");
            expect(props.onSubmit).toBeCalled();
        });
    });

    describe("if disabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps({
                declined: DISABLED,
            });
            wrapper = mount(<SubmitButton {...props} />);
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("button")).toHaveLength(1);
            expect(wrapper.find("button").text()).toEqual("Submit");
            expect(wrapper.find("button").props().disabled).toBeTruthy();
            expect(wrapper.find(".disabled")).toHaveLength(1);
        });

        it("doesn't call onSubmit on click", () => {
            wrapper.find("button").simulate("click");
            expect(props.onSubmit).not.toBeCalled();
        });
    })
});