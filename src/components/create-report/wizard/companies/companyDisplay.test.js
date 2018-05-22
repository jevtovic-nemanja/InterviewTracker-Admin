import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { CompanyDisplay } from "./companyDisplay";

const createTestProps = props => ({
    company: {
        companyId: 101,
        name: "Endava"
    },
    selectedElementId: "",
    selectElement: jest.fn(),
    enableNextPhase: jest.fn(),
    newReportCompany: jest.fn(),
    getSelectedCompany: jest.fn(),
    ...props
});

describe("<CompanyDisplay />", () => {

    describe("always", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<CompanyDisplay {...props} />);
        });

        it("displays the correct data", () => {
            expect(wrapper.find("td").text()).toEqual(props.company.name);
        });

        it("calls the correct methods on click", () => {
            wrapper.simulate("click");
            expect(props.selectElement).toBeCalledWith(props.company.companyId);
            expect(props.newReportCompany).toBeCalledWith(props.company);
            expect(props.enableNextPhase).toBeCalled();
        });
    });

    describe("when selected", () => {
        const props = createTestProps({
            selectedElementId: 101
        });

        const wrapper = shallow(<CompanyDisplay {...props} />);

        it("applies selected styles", () => {
            expect(wrapper.find(".selected")).toHaveLength(1);
        });
    });
});