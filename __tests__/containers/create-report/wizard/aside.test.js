import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Aside from "Containers/create-report/wizard/aside/aside";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({
    createReportPhase: 1,
    newReportData: {
        candidateName: "John Doe",
        companyName: "Endava"
    },
    ...props
});

const phases = [1, 2, 3];

describe("<Aside />", () => {
    let store;
    let wrapper;

    const applyPhase = phase => wrapper.setProps({
        phase: phase
    });

    beforeEach(() => {
        store = mockedStore(
            createTestState()
        );
        wrapper = shallow(<Aside store={store} />).dive();
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
        const values = Object.values(store.getState().newReportData);
        const titles = wrapper.find("h4");

        titles.forEach((node, index) => {
            expect(node.text()).toEqual(values[index]);
        });
    });
});