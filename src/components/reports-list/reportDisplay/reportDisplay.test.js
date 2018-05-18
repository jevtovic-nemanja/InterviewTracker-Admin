import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { ReportDisplay } from "./reportDisplay";

const createTestProps = props => ({
    report: {
        id: 258,
        companyName: "Endava",
        candidateName: "John Doe",
        date: "20/04/2018",
        status: "Passed"
    },
    openDeleteModal: jest.fn(id => { }),
    openDetailsModal: jest.fn(report => { }),
    ...props
});

describe("<ReportDisplay />", () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<ReportDisplay {...props} />);
    });

    it("should display all report info correctly", () => {
        const values = Object.values(props.report);
        const titles = wrapper.find("h5");

        titles.forEach((node, index) => expect(node.text()).toEqual(values[index + 1]));
    });

    it("should pass the report on when details button is clicked", () => {
        wrapper.find(".btn-details").simulate("click");
        expect(props.openDetailsModal).toBeCalledWith(props.report);
    });

    it("should pass the report ID on when delete report button is clicked", () => {
        wrapper.find(".btn-delete-report").simulate("click");
        expect(props.openDeleteModal).toBeCalledWith(props.report.id);
    });
});