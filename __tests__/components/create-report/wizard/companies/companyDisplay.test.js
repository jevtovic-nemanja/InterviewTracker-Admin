import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";

const createTestProps = props => ({
    company: {
        companyId: 101,
        name: "Endava"
    },
    selected: "",
    handleClick: jest.fn(),
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

        it("calls the correct method on click", () => {
            wrapper.simulate("click");
            expect(props.handleClick).toBeCalled();
        });
    });

    describe("when selected", () => {
        const props = createTestProps({
            selected: 101
        });

        const wrapper = shallow(<CompanyDisplay {...props} />);

        it("applies selected styles", () => {
            expect(wrapper.find(".selected")).toHaveLength(1);
        });
    });
});