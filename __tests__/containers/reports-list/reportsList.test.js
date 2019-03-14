import React from "react";

import { shallow } from "enzyme";

import configureStore from "redux-mock-store";

import ReportsList from "Containers/reports-list/reportsList";

import Modal from "react-responsive-modal";
import Search from "Containers/common/search/search";
import { Message } from "Components/common/message/message";
import { ReportDisplay } from "Components/reports-list/reportDisplay/reportDisplay";
import { ReportDetails } from "Components/reports-list/reportDetails/reportDetails";
import { DeleteReport } from "Components/reports-list/deleteReport/deleteReport";

import {
    startFetchData,
    startDeleteReport
} from "Store/actions";

import { ReportData, Messages } from "Src/constants";

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
            wrapper = shallow(<ReportsList store={store} />).dive().children().last().shallow();
        });

        it("fetches data when mounted", () => {
            expect(store.getActions()).toEqual([startFetchData()]);
        });

        it("renders the correct components", () => {
            expect(wrapper.find("main")).toHaveLength(1);
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(Modal)).toHaveLength(2);
            expect(wrapper.find(ReportDetails)).toHaveLength(1);
            expect(wrapper.find(DeleteReport)).toHaveLength(1);
            expect(wrapper.find(Message)).toHaveLength(0);
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

        const wrapper = shallow(<ReportsList store={store} />).dive().children().last().shallow();

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

        const wrapper = shallow(<ReportsList store={store} />).dive().children().last().shallow();

        it("displays the correct message ", () => {
            expect(wrapper.find(ReportDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(Messages.NO_REPORTS);
        });
    });

    describe("if there are reports that match the filter criteria", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState({ searchItem: "endava" })
            );
            wrapper = shallow(<ReportsList store={store} />).dive().children().last().shallow();
        });

        it("renders a <ReportDisplay /> component for each report", () => {
            const state = store.getState();
            const reports = state.data.reports;
            const searchItem = state.searchItem;

            expect(wrapper.find(ReportDisplay)).toHaveLength(reports.filter(report => {
                const candidate = report.candidateName.toLowerCase();
                const company = report.companyName.toLowerCase();
                return candidate.includes(searchItem) || company.includes(searchItem);
            }).length);
        });

        it("opens the details modal with correct report data", () => {
            wrapper.find(ReportDisplay).first().props().openDetailsModal();

            expect(wrapper.state("detailsModal")).toEqual(true);
            expect(wrapper.state("detailedReport")).toEqual(store.getState().data.reports[0]);
        });

        it("closes the details modal", () => {
            wrapper.instance().openDetailsModal(store.getState().data.reports[0]);
            wrapper.instance().closeDetailsModal();

            expect(wrapper.state("detailsModal")).toEqual(false);
            expect(wrapper.state("detailedReport")).toEqual({});
        });

        it("opens the delete modal with the correct report id", () => {
            wrapper.find(ReportDisplay).first().props().openDeleteModal();

            expect(wrapper.state("deleteModal")).toEqual(true);
            expect(wrapper.state("deleteReportId")).toEqual(store.getState().data.reports[0].id);
        });

        it("closes the delete modal", () => {
            wrapper.instance().openDeleteModal(store.getState().data.reports[0].id);
            wrapper.instance().closeDeleteModal();

            expect(wrapper.state("deleteModal")).toEqual(false);
            expect(wrapper.state("deleteReportId")).toEqual("");
        });

        it("initiates the deletion of the correct report and then closes the delete modal", () => {
            store.clearActions();

            wrapper.instance().openDeleteModal(store.getState().data.reports[0].id);
            wrapper.instance().deleteReport();

            expect(store.getActions()).toEqual([startDeleteReport(store.getState().data.reports[0].id)]);
            expect(wrapper.state("deleteModal")).toEqual(false);
            expect(wrapper.state("deleteReportId")).toEqual("");
        });
    });
});