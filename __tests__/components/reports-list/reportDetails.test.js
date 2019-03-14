import React from "react";

import { shallow } from "enzyme";

import { ReportDetails } from "Components/reports-list/reportDetails/reportDetails";

import { ReportData } from "Src/constants";

const createTestProps = props => ({
    report: {
        candidateName: "John Doe",
        companyName: "Endava",
        date: "20/04/2018",
        phase: ReportData.phases.CV,
        status: ReportData.statuses.PASSED,
        note: "Note"
    },
    ...props
});

describe("<ReportDetails />", () => {
    const props = createTestProps();
    const wrapper = shallow(<ReportDetails {...props} />);

    it("should display all report info correctly", () => {
        const values = Object.values(props.report);
        const titles = wrapper.find("h5");
        const notes = wrapper.find(".notes");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index]));

        expect(notes.text()).toEqual(values[values.length - 1]);
    });
});