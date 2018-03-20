import React from "react";
import { connect } from "react-redux";

import { ReportsList } from "../components/reports-list/reportsList";
import { startFetchReports, noFilterResults, openDetailsModal, closeDetailsModal, openDeleteModal, closeDeleteModal, startDeleteReport } from "../store/actions";


const filterReports = (reports, searchItem) => {
    if (reports.length) {
        const filteredReports = reports.filter(report => {
            const candidate = report.candidate.toLowerCase();
            const company = report.company.toLowerCase();
            return candidate.includes(searchItem) || company.includes(searchItem);
        });
        return filteredReports.length
            ? filteredReports
            : [{
                id: "NO_RESULTS",
                message: "No candidates or companies match the search criteria."
            }];
    } else return [];
};

const mapStateToProps = state => ({
    loading: state.loading,
    reports: filterReports(state.reports, state.searchItem),
    message: state.message,
    detailsModal: state.detailsModal,
    detailedReport: state.detailedReport,
    deleteModal: state.deleteModal,
    deleteReportId: state.deleteReportId
});

const mapDispatchToProps = dispatch => ({
    openDetailsModal: report => dispatch(openDetailsModal(report)),
    closeDetailsModal: () => dispatch(closeDetailsModal()),
    openDeleteModal: id => dispatch(openDeleteModal(id)),
    closeDeleteModal: () => dispatch(closeDeleteModal()),
    deleteReport: () => dispatch(startDeleteReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsList);