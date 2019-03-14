import React from "react";

import { shallow } from "enzyme";

import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";

describe("<CompanyDisplay />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            company: {
                companyId: 101,
                name: "Endava"
            },
            selected: "",
            handleClick: jest.fn(),
            ...newProps
        };

        wrapper = shallow(<CompanyDisplay {...props} />);
    };

    describe("always", () => {
        beforeEach(() => {
            setUpTest();
        });

        it("displays the correct data", () => {
            expect(wrapper.find("td").text()).toEqual(props.company.name);
        });

        it("calls the correct method on click", () => {
            wrapper.simulate("click");
            expect(props.handleClick).toBeCalled();
        });
    });

    it("applies selected styles when selected", () => {
        setUpTest({
            selected: 101
        });

        expect(wrapper.find(".selected")).toHaveLength(1);
    });
});