import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

import ReportList from "./reportsList";

import Modal from "react-responsive-modal";
import Search from "Containers/common/search";
import { ReportDisplay } from "./reportDisplay/reportDisplay";
import { ReportDetails } from "./reportDetails/reportDetails";
import { DeleteReport } from "./deleteReport/deleteReport";

describe("<ReportsList />", () => {
    let wrapper;

    const mockedEvent = {
        target: {}
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

    it("should fetch data when mounted", () => {
        expect(wrapper.instance().props.startFetchData).toHaveBeenCalledTimes(1);
    });

    it("should render the correct components", () => {
        expect(wrapper.find("main")).toHaveLength(1);
        expect(wrapper.find(Search)).toHaveLength(1);
        expect(wrapper.find(Modal)).toHaveLength(3);
        expect(wrapper.find(ReportDetails)).toHaveLength(1);
        expect(wrapper.find(DeleteReport)).toHaveLength(1);
    });

    it("should display message if fetching reports fails", () => {
        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(".text-center")).toHaveLength(1);
        expect(wrapper.find("h5").text()).toEqual(wrapper.instance().props.message);
    });

    it("should display message if no reports match the filter criteria", () => {
        const mockedErrorMessageReport = {
            id: "NO_RESULTS",
            message: "No candidates or companies match the search criteria."
        };

        wrapper.setProps({
            reports: [{ ...mockedErrorMessageReport }]
        });

        expect(wrapper.find(ReportDisplay)).toHaveLength(0);
        expect(wrapper.find(".text-center")).toHaveLength(1);
        expect(wrapper.find("h5").text()).toEqual(wrapper.instance().props.reports[0].message);
    });

    it("should display a <ReportDisplay /> component for each report", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        expect(wrapper.find(ReportDisplay)).toHaveLength(mockedReports.length);
    });

    it("should open details modal with correct report data", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        wrapper.instance().openDetailsModal(mockedReports[1]);
        expect(wrapper.state("detailsModal")).toEqual(true);
        expect(wrapper.state("detailedReport")).toEqual(mockedReports[1]);
    });

    it("should close details modal", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        wrapper.instance().openDetailsModal(mockedReports[1]);
        wrapper.instance().closeDetailsModal();

        expect(wrapper.state("detailsModal")).toEqual(false);
        expect(wrapper.state("detailedReport")).toEqual({});
    });

    it("should open delete modal with correct report id", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        wrapper.instance().openDeleteModal(mockedReports[1].id);
        expect(wrapper.state("deleteModal")).toEqual(true);
        expect(wrapper.state("deleteReportId")).toEqual(mockedReports[1].id);
    });

    it("should close delete modal", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        wrapper.instance().openDeleteModal(mockedReports[1].id);
        wrapper.instance().closeDeleteModal();

        expect(wrapper.state("deleteModal")).toEqual(false);
        expect(wrapper.state("deleteReportId")).toEqual("");
    });

    it("should initiate correct report deletion and then close delete modal", () => {
        wrapper.setProps({
            reports: mockedReports
        });

        wrapper.instance().openDeleteModal(mockedReports[1].id);
        wrapper.instance().deleteReport();

        expect(wrapper.instance().props.startDeleteReport).toBeCalledWith(mockedReports[1].id);
        expect(wrapper.state("deleteModal")).toEqual(false);
        expect(wrapper.state("deleteReportId")).toEqual("");
    });

    it("should display correct message in message modal", () => {
        expect(wrapper.find("p").text()).toEqual(wrapper.instance().props.message);
    });

    it("should close message modal if it is open", () => {
        wrapper.setProps({
            open: true
        });

        wrapper.find("button").simulate("click", mockedEvent);
        expect(wrapper.instance().props.closeMessageModal).toBeCalled();
    });

    it("should not attempt to close message modal if it is closed", () => {
        wrapper.find("button").simulate("click", mockedEvent);
        expect(wrapper.instance().props.closeMessageModal).not.toBeCalled();
    });
});