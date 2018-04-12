import React from "react";
import { connect } from "react-redux";

import FillReport from "../components/create-report/fillReport";
import { startSubmitReport, decrementPhase, closeMessageModal } from "../store/actions";

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

const mapDispatchToProps = dispatch => ({
    onBack: () => {
        dispatch(decrementPhase());
        location.hash = "#/create-report/2";
    },
    startSubmitReport: data => dispatch(startSubmitReport(data)),
    closeMessageModal: () => dispatch(closeMessageModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FillReport);