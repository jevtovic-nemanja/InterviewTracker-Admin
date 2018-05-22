import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import ReportsList from "./reportsList";

import Modal from "react-responsive-modal";
import Search from "Containers/common/search/search";
import { Message } from "Components/common/message/message";
import { MessageModal } from "Components/common/messageModal/messageModal";
import { ReportDisplay } from "Components/reports-list/reportDisplay/reportDisplay";
import { ReportDetails } from "Components/reports-list/reportDetails/reportDetails";
import { DeleteReport } from "Components/reports-list/deleteReport/deleteReport";

import {
    startFetchData,
    startDeleteReport,
    closeMessageModal
} from "Store/actions";

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
                status: "Passed"
            },
            {
                id: 278,
                companyName: "PS Tech",
                candidateName: "Jane Smith",
                date: "24/04/2018",
                status: "Declined"
            }
        ]
    },
    message: "",
    messageModal: false,
    searchItem: "",
    ...props
});

describe("<ReportsList />", () => {

    describe("always", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState()
            );
            wrapper = shallow(<ReportsList store={store} />).dive();
        });

        it("fetches data when mounted", () => {
            expect(store.getActions()).toEqual([startFetchData()]);
        });

        it("renders the correct components", () => {
            expect(wrapper.find("main")).toHaveLength(1);
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(Modal)).toHaveLength(3);
            expect(wrapper.find(ReportDetails)).toHaveLength(1);
            expect(wrapper.find(DeleteReport)).toHaveLength(1);
            expect(wrapper.find(Message)).toHaveLength(0);
            expect(wrapper.find(MessageModal)).toHaveLength(1);
        });

        it("does not attempt to close the message modal if it is closed", () => {
            store.clearActions();
            wrapper.find(MessageModal).props().close();
            expect(store.getActions()).toEqual([]);
        });
    });

    describe("if fetching reports fails", () => {

        const store = mockedStore(
            createTestState({
                data: {
                    reports: []
                },
                message: "message"
            })
        );

        const wrapper = shallow(<ReportsList store={store} />).dive();

        it("displays the correct message ", () => {
            expect(wrapper.find(ReportDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
        });
    });

    describe("if no reports match the filter criteria", () => {

        const store = mockedStore(
            createTestState({ searchItem: "wz" })
        );
        
        const wrapper = shallow(<ReportsList store={store} />).dive();

        it("displays the correct message ", () => {
            expect(wrapper.find(ReportDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(wrapper.instance().props.reports[0].message);
        });
    });

    describe("if there are reports that match the filter criteria", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState({ searchItem: "endava" })
            );
            wrapper = shallow(<ReportsList store={store} />).dive();
        });

        it("renders a <ReportDisplay /> component for each report", () => {
            expect(wrapper.find(ReportDisplay)).toHaveLength(wrapper.instance().props.reports.length);
        });

        it("opens the details modal with correct report data", () => {
            wrapper.instance().openDetailsModal(wrapper.instance().props.reports[0]);

            expect(wrapper.state("detailsModal")).toEqual(true);
            expect(wrapper.state("detailedReport")).toEqual(wrapper.instance().props.reports[0]);
        });

        it("closes the details modal", () => {
            wrapper.instance().openDetailsModal(wrapper.instance().props.reports[0]);
            wrapper.instance().closeDetailsModal();

            expect(wrapper.state("detailsModal")).toEqual(false);
            expect(wrapper.state("detailedReport")).toEqual({});
        });

        it("opens the delete modal with the correct report id", () => {
            wrapper.instance().openDeleteModal(wrapper.instance().props.reports[0].id);

            expect(wrapper.state("deleteModal")).toEqual(true);
            expect(wrapper.state("deleteReportId")).toEqual(wrapper.instance().props.reports[0].id);
        });

        it("closes the delete modal", () => {
            wrapper.instance().openDeleteModal(wrapper.instance().props.reports[0].id);
            wrapper.instance().closeDeleteModal();

            expect(wrapper.state("deleteModal")).toEqual(false);
            expect(wrapper.state("deleteReportId")).toEqual("");
        });

        it("initiates the deletion of the correct report and then closes the delete modal", () => {
            store.clearActions();

            wrapper.instance().openDeleteModal(wrapper.instance().props.reports[0].id);
            wrapper.instance().deleteReport();

            expect(store.getActions()).toEqual([startDeleteReport(wrapper.instance().props.reports[0].id)]);
            expect(wrapper.state("deleteModal")).toEqual(false);
            expect(wrapper.state("deleteReportId")).toEqual("");
        });
    });

    describe("if report deletion fails", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState({
                    message: "message",
                    messageModal: true
                })
            );
            wrapper = shallow(<ReportsList store={store} />).dive();
        });

        it("displays the passed message in the message modal", () => {
            expect(wrapper.find(MessageModal).props().message).toEqual(store.getState().message);
        });

        it("closes the message modal if it is open", () => {
            store.clearActions();

            wrapper.find(MessageModal).props().close();
            expect(store.getActions()).toEqual([closeMessageModal()]);
        });
    })
});