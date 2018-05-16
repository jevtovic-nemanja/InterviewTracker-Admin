import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ReportForm from "Components/create-report/wizard/reportForm/reportForm";

import {
    startSubmitReport,
    decrementPhase,
    closeMessageModal
} from "Store/actions/index";

const getTrackedData = (reports, newReportData) => {
    const candidatesReportsWithCompany = reports.filter(report => report.candidateId === newReportData.candidateId && report.companyId === newReportData.companyId);

    if (candidatesReportsWithCompany.length) {
        const lastSubmittedReport = candidatesReportsWithCompany.shift();
        const { phase, status, date } = lastSubmittedReport;

        let hiringStatus;

        status === "declined"
            ? hiringStatus = "Declined"
            : phase === "final" && status === "passed"
                ? hiringStatus = "Hired"
                : hiringStatus = "Select";

        return {
            ...newReportData,
            currentPhase: phase,
            currentStatus: status,
            timeOfLastInterview: date,
            hiringStatus
        };
    } else {
        return {
            ...newReportData,
            currentPhase: "none",
            currentStatus: "",
            timeOfLastInterview: null,
            hiringStatus: "Select"
        };
    }
};

const mapStateToProps = state => ({
    trackedData: getTrackedData(state.data.reports, state.newReportData),
    message: state.message,
    open: state.messageModal
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startSubmitReport,
    decrementPhase,
    closeMessageModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);