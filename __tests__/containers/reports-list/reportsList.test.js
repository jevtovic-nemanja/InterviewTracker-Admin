import React from "react";

import { shallow } from "enzyme";

import configureStore from "redux-mock-store";

import ReportsList, { filterReports } from "Containers/reports-list/reportsList";

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

describe("<ReportsList />", () => {
    let wrapper;
    let store;

    const setUpTest = newProps => {
        store = mockedStore(
            {
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
                ...newProps
            }
        );

        wrapper = shallow(<ReportsList store={store} />).dive().children().last().shallow();
    };

    describe("always", () => {
        beforeEach(() => {
            setUpTest();
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

    it("displays the correct message if fetching reports fails", () => {
        setUpTest({
            data: {
                reports: []
            },
            message: "message"
        });

        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
    });

    it("displays the correct message if no reports match the filter criteria", () => {
        setUpTest({ searchItem: "wz" });

        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(Messages.NO_REPORTS);
    });

    describe("if there are reports that match the filter criteria", () => {
        beforeEach(() => {
            setUpTest({ searchItem: "endava" });
        });

        it("renders a <ReportDisplay /> component for each report", () => {
            const state = store.getState();

            expect(wrapper.find(ReportDisplay)).toHaveLength(filterReports(state.data.reports, state.searchItem).length);
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