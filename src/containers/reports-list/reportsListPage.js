import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ReportsList from "../../components/reports-list/reportsList";

import {
    startFetchData,
    startDeleteReport,
    closeMessageModal
} from "../../store/actions/actions";


const filterReports = (reports, searchItem) => {
    if (reports.length) {
        const filteredReports = reports.filter(report => {
            const candidate = report.candidateName.toLowerCase();
            const company = report.companyName.toLowerCase();
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
    reports: filterReports(state.data.reports, state.searchItem),
    message: state.message,
    open: state.messageModal
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startFetchData,
    startDeleteReport: id => startDeleteReport(id),
    closeMessageModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReportsList);