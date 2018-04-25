import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import ReportList from "./reportsList";

import Modal from "react-responsive-modal";
import Search from "Containers/common/search";
import { ReportDisplay } from "../reportDisplay/reportDisplay";
import { ReportDetails } from "../reportDetails/reportDetails";
import { DeleteReport } from "../deleteReport/deleteReport";

describe("<ReportsList />", () => {
    let wrapper;

    const mockedErrorMessageReport = {
        id: "NO_RESULTS",
        message: "No candidates or companies match the search criteria."
    };

    const mockedReports = [
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
    ];

    const useMockedReports = () => wrapper.setProps({
        reports: mockedReports
    });

    beforeEach(() => {
        const mockedProps = {
            reports: [],
            message: "message",
            open: false,
            startFetchData: jest.fn(),
            startDeleteReport: jest.fn(id => {}),
            closeMessageModal: jest.fn()
        };

        wrapper = shallow(<ReportList {...mockedProps} />);
    });

    it("renders the correct components", () => {
        expect(wrapper.find("main")).toHaveLength(1);
        expect(wrapper.find(Search)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(3);
        expect(wrapper.find(ReportDetails)).toHaveLength(1);
        expect(wrapper.find(DeleteReport)).toHaveLength(1);
    });

    it("fetches data when mounted", () => {
        expect(wrapper.instance().props.startFetchData).toHaveBeenCalledTimes(1);
    });

    it("displays a message if fetching reports fails", () => {
        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(".text-center")).toHaveLength(1);
        expect(wrapper.find("h5").text()).toEqual(wrapper.instance().props.message);
    });

    it("displays a message if no reports match the filter criteria", () => {
        wrapper.setProps({
            reports: [{ ...mockedErrorMessageReport }]
        });

        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(".text-center")).toHaveLength(1);
        expect(wrapper.find("h5").text()).toEqual(wrapper.instance().props.reports[0].message);
    });

    it("renders a <ReportDisplay /> component for each report", () => {
        useMockedReports();
        expect(wrapper.find(ReportDisplay)).toHaveLength(mockedReports.length);
    });

    it("opens the details modal with correct report data", () => {
        useMockedReports();
        wrapper.instance().openDetailsModal(mockedReports[0]);

        expect(wrapper.state("detailsModal")).toEqual(true);
        expect(wrapper.state("detailedReport")).toEqual(mockedReports[0]);
    });

    it("closes the details modal", () => {
        useMockedReports();

        wrapper.instance().openDetailsModal(mockedReports[0]);
        wrapper.instance().closeDetailsModal();

        expect(wrapper.state("detailsModal")).toEqual(false);
        expect(wrapper.state("detailedReport")).toEqual({});
    });

    it("opens the delete modal with the correct report id", () => {
        useMockedReports();

        wrapper.instance().openDeleteModal(mockedReports[0].id);

        expect(wrapper.state("deleteModal")).toEqual(true);
        expect(wrapper.state("deleteReportId")).toEqual(mockedReports[0].id);
    });

    it("closes the delete modal", () => {
        useMockedReports();

        wrapper.instance().openDeleteModal(mockedReports[0].id);
        wrapper.instance().closeDeleteModal();

        expect(wrapper.state("deleteModal")).toEqual(false);
        expect(wrapper.state("deleteReportId")).toEqual("");
    });

    it("initiates the deletion of the correct report and then closes the delete modal", () => {
        useMockedReports();

        wrapper.instance().openDeleteModal(mockedReports[0].id);
        wrapper.instance().deleteReport();

        expect(wrapper.instance().props.startDeleteReport).toBeCalledWith(mockedReports[0].id);
        expect(wrapper.state("deleteModal")).toEqual(false);
        expect(wrapper.state("deleteReportId")).toEqual("");
    });

    it("displays the passed message in the message modal", () => {
        expect(wrapper.find("p").text()).toEqual(wrapper.instance().props.message);
    });

    it("does not attempt to close the message modal if it is closed", () => {
        wrapper.find("button").simulate("click");
        expect(wrapper.instance().props.closeMessageModal).not.toBeCalled();
    });

    it("closes the message modal if it is open", () => {
        wrapper.setProps({
            open: true
        });

        wrapper.find("button").simulate("click");
        expect(wrapper.instance().props.closeMessageModal).toBeCalled();
    });
});