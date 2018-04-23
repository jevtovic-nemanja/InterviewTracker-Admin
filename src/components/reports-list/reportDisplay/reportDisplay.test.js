import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { ReportDisplay } from "./reportDisplay";

describe("<ReportDisplay />", () => {
    let wrapper;

    const mockedReport = {
        id: 258,
        companyName: "Endava",
        candidateName: "John Doe",
        date: "20/04/2018",
        status: "Passed"
    };

    const mockedEvent = {
        target: {}
    };

    let data;

    const receiveData = sentData => {
        data = { ...sentData }
    };

    beforeEach(() => {
        wrapper = shallow(<ReportDisplay report={mockedReport} openDetailsModal={receiveData} openDeleteModal={receiveData} />);
    });

    it("should display all report info correctly", () => {
        const values = Object.values(mockedReport);
        const titles = wrapper.find("h5");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index + 1]));
    });

    it("should pass the report on when details button is clicked", () => {
        wrapper.find(".btn-details").simulate("click", mockedEvent);
        expect(data).toEqual(mockedReport);
    });

    it("should pass the report ID on when delete report button is clicked", () => {
        wrapper.find(".btn-delete-report").simulate("click", mockedEvent);
        expect(data).toEqual({ ...mockedReport.id });
    });
});