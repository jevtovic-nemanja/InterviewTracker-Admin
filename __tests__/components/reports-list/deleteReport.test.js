import React from "react";

import { shallow } from "enzyme";

import { DeleteReport } from "Components/reports-list/deleteReport/deleteReport";

import styles from "Components/reports-list/deleteReport/deleteReport.css";

import { Messages } from "Src/constants";

describe("<DeleteReport />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            message: "",
            close: jest.fn(),
            deleteReport: jest.fn(),
            ...newProps
        };

        wrapper = shallow(<DeleteReport {...props} />);
    };

    describe("if there is no error message", () => {
        beforeEach(() => {
            setUpTest();
        });

        it("displays default delete modal", () => {
            expect(wrapper.find("p").text()).toEqual(Messages.DELETE_REPORT);
            expect(wrapper.find("button")).toHaveLength(2);
            expect(wrapper.find(`.${styles.btnDelete}`)).toHaveLength(1);
        });

        it("calls deleteReport function if delete button is clicked", () => {
            wrapper.find(`.${styles.btnDelete}`).simulate("click");
            expect(props.deleteReport).toHaveBeenCalledTimes(1);
        });
    });

    it("displays error message if there is one", () => {
        setUpTest({ message: "message" });

        expect(wrapper.find("p").text()).toEqual(props.message);
        expect(wrapper.find("button")).toHaveLength(1);
    });
});