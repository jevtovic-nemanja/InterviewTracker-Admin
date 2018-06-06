import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { ValidationError } from "Components/create-report/wizard/newReport/validationError/validationError";

const createTestProps = props => ({
    isValid: "",
    text: "message",
    ...props
});

describe("<ValidationError />", () => {

    describe("if valid", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<ValidationError {...props} />);
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

    describe("if invalid", () => {
        const props = createTestProps({
            isValid: "d-none"
        });

        const wrapper = shallow(<ValidationError {...props} />);

        it("is hidden", () => {
            expect(wrapper.find("div").hasClass("d-none")).toEqual(true);
        });
    });
});