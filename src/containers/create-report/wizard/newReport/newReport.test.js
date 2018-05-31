import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import NewReport from "./newReport";

import moment from "moment";

import Modal from "react-responsive-modal";

import { MessageModal } from "Components/common/messageModal/messageModal";
import { BackButton } from "Components/common/buttons/back/backButton";
import { SubmitButton } from "Components/common/buttons/submit/submitButton";
import { ValidationError } from "Components/create-report/wizard/newReport/validationError/validationError";
import { CustomDatePicker } from "Components/create-report/wizard/newReport/datePicker/datePicker";
import { Select } from "Components/create-report/wizard/newReport/select/select";
import { Notes } from "Components/create-report/wizard/newReport/notes/notes";

import {
    startSubmitReport,
    decrementPhase,
    closeMessageModal
} from "Store/actions";

import { ReportData } from "Src/constants";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({
    data: {
        reports: [
            {
                id: 258,
                companyName: "Endava",
                candidateName: "John Doe",
                date: "20/04/2018",
                status: ReportData.statuses.PASSED
            },
            {
                id: 278,
                companyName: "PS Tech",
                candidateName: "Jane Smith",
                date: "24/04/2018",
                status: ReportData.statuses.DECLINED
            }
        ]
    },
    newReportData: {
        candidateId: 27,
        candidateName: "John Doe",
        companyId: 258,
        companyName: "Endava"
    },
    message: "",
    messageModal: false,
    ...props
});

describe("<NewReport />", () => {

    describe("always", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState()
            );
            wrapper = shallow(<NewReport store={store} />).dive();
        });

        it("renders the correct components", () => {
            expect(wrapper.find(BackButton)).toHaveLength(2);
            expect(wrapper.find(SubmitButton)).toHaveLength(1);
            expect(wrapper.find(CustomDatePicker)).toHaveLength(1);
            expect(wrapper.find(Select)).toHaveLength(2);
            expect(wrapper.find(Notes)).toHaveLength(1);
            expect(wrapper.find(ValidationError)).toHaveLength(4);
            expect(wrapper.find(Modal)).toHaveLength(1);
            expect(wrapper.find(MessageModal)).toHaveLength(1);
        });

        it("calls the correct action when back button is clicked", () => {
            wrapper.find(BackButton).first().props().decrementPhase();
            expect(store.getActions()).toEqual([decrementPhase()]);
        })

        it("handles date input correctly", () => {
            const date = new Date("22.05.2018");
            wrapper.find(CustomDatePicker).props().handleDateChange(date);

            expect(wrapper.state("interviewDate")).toEqual(date);
            expect(wrapper.state("dateError")).toEqual("d-none");
            expect(wrapper.state("phaseError")).toEqual("d-none");
            expect(wrapper.state("statusError")).toEqual("d-none");
            expect(wrapper.state("noteError")).toEqual("d-none");
        })

        it("handles select and notes inputs correctly", () => {
            const phaseEvent = {
                target: {
                    name: "phase",
                    value: ReportData.phases.CV
                }
            };

            const statusEvent = {
                target: {
                    name: "status",
                    value: ReportData.statuses.PASSED
                }
            };

            const notesEvent = {
                target: {
                    name: "note",
                    value: "notes"
                }
            };

            const selects = wrapper.find(Select);

            selects.first().props().onChange(phaseEvent);

            expect(wrapper.state("phase")).toEqual(phaseEvent.target.value);
            expect(wrapper.state("dateError")).toEqual("d-none");
            expect(wrapper.state("phaseError")).toEqual("d-none");
            expect(wrapper.state("statusError")).toEqual("d-none");
            expect(wrapper.state("noteError")).toEqual("d-none");

            selects.at(1).props().onChange(statusEvent);

            expect(wrapper.state("status")).toEqual(statusEvent.target.value);
            expect(wrapper.state("dateError")).toEqual("d-none");
            expect(wrapper.state("phaseError")).toEqual("d-none");
            expect(wrapper.state("statusError")).toEqual("d-none");
            expect(wrapper.state("noteError")).toEqual("d-none");

            wrapper.find(Notes).props().onChange(notesEvent);

            expect(wrapper.state("note")).toEqual(notesEvent.target.value);
            expect(wrapper.state("dateError")).toEqual("d-none");
            expect(wrapper.state("phaseError")).toEqual("d-none");
            expect(wrapper.state("statusError")).toEqual("d-none");
            expect(wrapper.state("noteError")).toEqual("d-none");
        });

        it("doesn't attempt to close the message modal if it isn't open", () => {
            wrapper.find(MessageModal).props().close();
            expect(store.getActions()).toEqual([]);
        });

        it("validates data correctly - invalid data", () => {
            const isValid = wrapper.instance().validateInput();

            expect(isValid).toEqual(false);

            expect(wrapper.state("dateError")).toEqual("");
            expect(wrapper.state("phaseError")).toEqual("");
            expect(wrapper.state("statusError")).toEqual("");
            expect(wrapper.state("noteError")).toEqual("");
        });

        it("validates data correctly - valid data", () => {
            wrapper.instance().setState({
                interviewDate: moment("Wed May 02 2018 00:00:00 GMT+0200 (Central Europe Daylight Time)"),
                phase: ReportData.phases.CV,
                status: ReportData.statuses.PASSED,
                note: "note"
            });

            const isValid = wrapper.instance().validateInput();

            expect(isValid).toEqual(true);

            expect(wrapper.state("dateError")).toEqual("d-none");
            expect(wrapper.state("phaseError")).toEqual("d-none");
            expect(wrapper.state("statusError")).toEqual("d-none");
            expect(wrapper.state("noteError")).toEqual("d-none");
        });

        it("doesn't submit invalid data", () => {
            const mockedEvent = {
                preventDefault: jest.fn()
            };

            const spy = jest.spyOn(wrapper.instance(), "validateInput");
            
            wrapper.find(SubmitButton).props().onSubmit(mockedEvent);
            
            expect(spy).toBeCalled();
            expect(store.getActions()).toEqual([]);
        });

        it("submits valid data", () => {
            const mockedEvent = {
                preventDefault: jest.fn()
            };

            wrapper.instance().setState({
                interviewDate: moment("Wed May 02 2018 00:00:00 GMT+0200 (Central Europe Daylight Time)"),
                phase: ReportData.phases.CV,
                status: ReportData.statuses.PASSED,
                note: "note"
            });

            const { interviewDate, phase, status, note } = wrapper.instance().state;
            const { trackedData } = wrapper.instance().props;
            const { candidateId, candidateName, companyId, companyName } = trackedData;

            const data = {
                candidateId,
                candidateName,
                companyId,
                companyName,
                interviewDate: "" + new Date(interviewDate),
                phase: phase.toLowerCase(),
                status: status.toLowerCase(),
                note
            };

            const spy = jest.spyOn(wrapper.instance(), "validateInput");

            wrapper.find(SubmitButton).props().onSubmit(mockedEvent);

            expect(spy).toBeCalled();
            expect(store.getActions()).toEqual([startSubmitReport(data)]);
        });
    });

    describe("if report submission fails", () => {
        const store = mockedStore(
            createTestState({
                message: "message",
                messageModal: true
            })
        );

        const wrapper = shallow(<NewReport store={store} />).dive();

        it("closes the message modal", () => {
            wrapper.find(MessageModal).props().close();
            expect(store.getActions()).toEqual([closeMessageModal()]);
        });
    });
});