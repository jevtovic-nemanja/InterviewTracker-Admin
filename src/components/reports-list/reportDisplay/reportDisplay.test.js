import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { ReportDisplay } from "./reportDisplay";

describe("<ReportDisplay />", () => {
    let wrapper;

    const mockedEvent = {
        target: {}
    };

    const mockedProps = {
        report: {
            id: 258,
            companyName: "Endava",
            candidateName: "John Doe",
            date: "20/04/2018",
            status: "Passed"
        },
        openDeleteModal: jest.fn(id => { }),
        openDetailsModal: jest.fn(report => { })
    }

    beforeEach(() => {
        wrapper = shallow(<ReportDisplay {...mockedProps} />);
    });

    it("should display all report info correctly", () => {
        const values = Object.values(mockedProps.report);
        const titles = wrapper.find("h5");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index + 1]));
    });

    it("should pass the report on when details button is clicked", () => {
        wrapper.find(".btn-details").simulate("click", mockedEvent);
        expect(mockedProps.openDetailsModal).toBeCalledWith(mockedProps.report);
    });

    it("should pass the report ID on when delete report button is clicked", () => {
        wrapper.find(".btn-delete-report").simulate("click", mockedEvent);
        expect(mockedProps.openDeleteModal).toBeCalledWith(mockedProps.report.id);
    });
});