import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { ReportDetails } from "./reportDetails";

describe("<ReportDetails />", () => {
    const mockedProps = {
        report: {
            candidateName: "John Doe",
            companyName: "Endava",
            date: "20/04/2018",
            phase: "Cv",
            status: "Passed",
            note: "Note"
        }
    };

    const wrapper = shallow(<ReportDetails {...mockedProps} />);

    it("should display all report info correctly", () => {
        const values = Object.values(mockedProps.report);
        const titles = wrapper.find("h5");
        const notes = wrapper.find(".notes");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index]));

        expect(notes.text()).toEqual(values[values.length - 1]);
    });
});