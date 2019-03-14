import React from "react";

import { shallow } from "enzyme";

import { ReportDisplay } from "Components/reports-list/reportDisplay/reportDisplay";

import { ReportData } from "Src/constants";

describe("<ReportDisplay />", () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            report: {
                id: 258,
                companyName: "Endava",
                candidateName: "John Doe",
                date: "20/04/2018",
                status: ReportData.statuses.PASSED
            },
            openDeleteModal: jest.fn(),
            openDetailsModal: jest.fn(),
        };

        wrapper = shallow(<ReportDisplay {...props} />);
    });

    it("should display all report info correctly", () => {
        const values = Object.values(props.report);
        const titles = wrapper.find("h5");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index + 1]));
    });

    it("should call openDetailsModal when details button is clicked", () => {
        wrapper.find(".btn-details").simulate("click");
        expect(props.openDetailsModal).toBeCalled();
    });

    it("should call openDeleteModal when delete report button is clicked", () => {
        wrapper.find(".btn-delete-report").simulate("click");
        expect(props.openDeleteModal).toBeCalled();
    });
});