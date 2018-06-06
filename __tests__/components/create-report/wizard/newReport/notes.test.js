import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { Notes } from "Components/create-report/wizard/newReport/notes/notes";

import { DISABLED } from "Src/constants";

const createTestProps = props => ({
    labelText: "Notes",
    value: "note",
    onChange: jest.fn(),
    declined: "",
    ...props
});

describe("<Notes />", () => {

    describe("if enabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<Notes {...props} />);
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("label")).toHaveLength(1);
            expect(wrapper.find("textarea")).toHaveLength(1);
            expect(wrapper.find("textarea").props().disabled).toBeFalsy();
        });

        it("displays the passed value",() => {
            expect(wrapper.find("textarea").props().value).toEqual(props.value);
        });

        it("calls the onChange method", () => {
            wrapper.find("textarea").simulate("change");
            expect(props.onChange).toBeCalled();
        });
    });

    describe("if disabled", () => {
        const props = createTestProps({
            declined: DISABLED
        });

        const wrapper = shallow(<Notes {...props} />);

        it("displays the correct components", () => {
            expect(wrapper.find("label")).toHaveLength(1);
            expect(wrapper.find("textarea")).toHaveLength(1);
            expect(wrapper.find("textarea").props().disabled).toBeTruthy();
        });
    });
});