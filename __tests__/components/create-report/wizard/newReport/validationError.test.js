import React from "react";

import { shallow } from "enzyme";

import { ValidationError } from "Components/create-report/wizard/newReport/validationError/validationError";

describe("<ValidationError />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            isValid: "",
            text: "message",
            ...newProps
        };

        wrapper = shallow(<ValidationError {...props} />);
    };

    describe("if valid", () => {
        beforeEach(() => {
            setUpTest();
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("div")).toHaveLength(1);
            expect(wrapper.find("div").hasClass("d-none")).toEqual(false);
            expect(wrapper.find("small")).toHaveLength(1);
            expect(wrapper.find("small").hasClass("red")).toEqual(true);
        });

        it("displays the passed value", () => {
            expect(wrapper.find("small").text()).toEqual(props.text);
        });
    });

    it("is hidden if invalid", () => {
        setUpTest({
            isValid: "d-none"
        });

        expect(wrapper.find("div").hasClass("d-none")).toEqual(true);
    });
});