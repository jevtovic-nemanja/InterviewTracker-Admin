import React from "react";

import { ReportsList } from "../components/reports-list/reportsList";

import { startFetchReports, filterReportsSuccess, filterReportsFail } from "../store/actions";
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
    error: state.error
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps)(ReportsList);