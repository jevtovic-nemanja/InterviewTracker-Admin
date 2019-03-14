import React from "react";

import { shallow } from "enzyme";

import { Notes } from "Components/create-report/wizard/newReport/notes/notes";

import { DISABLED } from "Src/constants";

describe("<Notes />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            labelText: "Notes",
            value: "note",
            onChange: jest.fn(),
            declined: "",
            ...newProps
        };

        wrapper = shallow(<Notes {...props} />);
    };

    describe("if enabled", () => {
        beforeEach(() => {
            setUpTest();
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("label")).toHaveLength(1);
            expect(wrapper.find("textarea")).toHaveLength(1);
            expect(wrapper.find("textarea").props().disabled).toBeFalsy();
        });

        it("displays the passed value", () => {
            expect(wrapper.find("textarea").props().value).toEqual(props.value);
        });

        it("calls the onChange method", () => {
            wrapper.find("textarea").simulate("change");
            expect(props.onChange).toBeCalled();
        });
    });

    it("displays the correct components if disabled", () => {
        setUpTest({
            declined: DISABLED
        });

        expect(wrapper.find("label")).toHaveLength(1);
        expect(wrapper.find("textarea")).toHaveLength(1);
        expect(wrapper.find("textarea").props().disabled).toBeTruthy();
    });
});