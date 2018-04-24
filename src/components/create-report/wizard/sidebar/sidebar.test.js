import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import { Sidebar } from "./sidebar";

describe("<Sidebar />", () => {
    let wrapper;

    const phases = [1, 2, 3];

    const applyPhase = phase => wrapper.setProps({
        phase: phase
    });

    const mockedProps = {
        phase: 1,
        newReport: {
            candidateName: "John Doe",
            companyName: "Endava"
        }
    }

    beforeEach(() => {
        wrapper = shallow(<Sidebar {...mockedProps} />);
    });

    it("should display the proper margin", () => {
        const testMargin = phase => {
            const expectedBoolean = phase === 1 ? true : false;
            expect(wrapper.find(".row").hasClass("mb-3")).toEqual(expectedBoolean);
        };

        phases.forEach(phase => {
            applyPhase(phase);
            testMargin(phase);
        });
    });

    it("should apply correct styles to phase titles", () => {
        const testStyles = phase => {
            const titles = wrapper.find("h5");

            titles.forEach((node, index) => {
                const expectedBoolean = (index + 1) === phase ? true : false;
                expect(node.hasClass("font-weight-bold")).toEqual(expectedBoolean);
                expect(node.hasClass("text-muted d-none d-md-inline-block")).toEqual(!expectedBoolean);
            })
        };

        phases.forEach(phase => {
            applyPhase(phase);
            testStyles(phase);
        });
    });

    it("should display candidate name in the correct phases", () => {
        const testDisplay = phase => {
            const expectedBoolean = phase === 1 ? true : false;
            expect(wrapper.find(".candidate").hasClass("d-none")).toEqual(expectedBoolean);
        }

        phases.forEach(phase => {
            applyPhase(phase);
            testDisplay(phase);
        });
    });

    it("should display company name only in the final phase", () => {
        const testDisplay = phase => {
            const expectedBoolean = phase === 3 ? false : true;
            expect(wrapper.find(".company").hasClass("d-none")).toEqual(expectedBoolean);
        }

        phases.forEach(phase => {
            applyPhase(phase);
            testDisplay(phase);
        });
    });

    it("should correctly display candidate and company names passed as props", () => {
        const values = Object.values(mockedProps.newReport);
        const titles = wrapper.find("h4");

        titles.forEach((node, index) => {
            expect(node.text()).toEqual(values[index]);
        });
    });
});