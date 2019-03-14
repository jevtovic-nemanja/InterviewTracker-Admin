import React from "react";

import { shallow } from "enzyme";

import { CustomDatePicker } from "Components/create-report/wizard/newReport/datePicker/datePicker";
import DatePicker from "react-datepicker";

describe("<CustomDatePicker />", () => {
    const props = {
        interviewDate: {},
        timeOfLastInterview: "21.05.2018",
        handleDateChange: jest.fn(),
        disabled: false,
        ...props
    };

    const wrapper = shallow(<CustomDatePicker {...props} />);

    it("displays the correct components and elements", () => {
        expect(wrapper.find("label")).toHaveLength(1);
        expect(wrapper.find(DatePicker)).toHaveLength(1);
    });
});