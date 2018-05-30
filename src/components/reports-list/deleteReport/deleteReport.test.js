import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { DeleteReport } from "./deleteReport";

import styles from "./deleteReport.css";

import { Messages } from "Src/constants";

const createTestProps = props => ({
    message: "",
    close: jest.fn(),
    deleteReport: jest.fn(),
    ...props
});

describe("<DeleteReport />", () => {

    describe("if there is no error message", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<DeleteReport {...props} />);
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

    describe("if there is an error message", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps({ message: "message" });
            wrapper = shallow(<DeleteReport {...props} />);
        });

        it("displays error message", () => {
            expect(wrapper.find("p").text()).toEqual(props.message);
            expect(wrapper.find("button")).toHaveLength(1);
        });
    });
});