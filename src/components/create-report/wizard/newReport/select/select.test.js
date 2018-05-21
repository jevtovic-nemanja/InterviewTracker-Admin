import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { Select } from "./select";

const createTestProps = props => ({
    labelText: "Select",
    name: "select",
    value: "select",
    onChange: jest.fn(),
    declined: "",
    options: ["1", "2", "3"],
    ...props
});

describe("<Select />", () => {

    describe("if enabled", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<Select {...props} />);
        });

        it("displays the correct elements", () => {
            expect(wrapper.find("label")).toHaveLength(1);
            expect(wrapper.find("select")).toHaveLength(1);
            expect(wrapper.find("select").props().disabled).toBeFalsy();
            expect(wrapper.find("option")).toHaveLength(props.options.length);
        });

        it("displays the correct data", () => {
            expect(wrapper.find("label").text()).toEqual(props.labelText);
            expect(wrapper.find("select").props().name).toEqual(props.name);
            expect(wrapper.find("select").props().value).toEqual(props.value);

            const options = wrapper.find("option");
            options.forEach((option, index) => {
                expect(option.text()).toEqual(props.options[index]);
            });
        });

        it("displays the first option as hidden", () => {
            const options = wrapper.find("option");
            options.forEach((option, index) => {
                index === 0
                    ? expect(option.props().hidden).toBeTruthy()
                    : expect(option.props().hidden).toBeFalsy();
            });
        });

        it("calls the onChange method", () => {
            wrapper.find("select").simulate("change");
            expect(props.onChange).toBeCalled();
        });
    });

    describe("if disabled", () => {
        const props = createTestProps({
            declined: "disabled"
        });

        const wrapper = shallow(<Select {...props} />);

        it("displays the correct elements", () => {
            expect(wrapper.find("label")).toHaveLength(1);
            expect(wrapper.find("select")).toHaveLength(1);
            expect(wrapper.find("select").props().disabled).toBeTruthy();
            expect(wrapper.find("option")).toHaveLength(props.options.length);
        });
    });
});