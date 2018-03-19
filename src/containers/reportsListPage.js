import React from "react";

import { ReportsList } from "../components/reports-list/reportsList";
import { openDetailsModal, closeDetailsModal } from "../store/actions";

import { connect } from "react-redux";

const filterReports = (reports, searchItem) => {
    const filteredReports = reports.filter(report => {
        const candidate = report.candidate.toLowerCase();
        const company = report.company.toLowerCase();
        return candidate.includes(searchItem) || company.includes(searchItem);
    });
    return filteredReports;
};

const mapStateToProps = state => ({
    loading: state.loading,
    reports: filterReports(state.reports, state.searchItem),
    error: state.error,
    detailsModal: state.detailsModal,
    detailedReport: state.detailedReport
});

const mapDispatchToProps = dispatch => ({
    openDetailsModal: report => dispatch(openDetailsModal(report)),
    closeDetailsModal: () => dispatch(closeDetailsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsList);