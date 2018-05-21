import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { CustomDatePicker } from "./datePicker";
import DatePicker from "react-datepicker";

const createTestProps = props => ({
    interviewDate: {},
    timeOfLastInterview: "21.05.2018",
    handleDateChange: jest.fn(),
    disabled: false,
    ...props
});

describe("<CustomDatePicker />", () => {
    const props = createTestProps();
    const wrapper = shallow(<CustomDatePicker {...props} />);

    it("displays the correct components and elements", () => {
        expect(wrapper.find("label")).toHaveLength(1);
        expect(wrapper.find(DatePicker)).toHaveLength(1);
    });
});