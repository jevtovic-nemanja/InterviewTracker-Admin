import React from "react";
import { connect } from "react-redux";

import { FillReport } from "../components/create-report/fillReport";
import { receiveDateChange, receiveNewReportFormInput, startSubmitReport, newReportFormError, decrementPhase, closeSubmitModal, openSubmitModal } from "../store/actions";

const getTrackedData = (reports, newReportData) => {
    const candidatesReportsWithCompany = reports.filter(report => report.candidateId === newReportData.candidateId && report.companyId === newReportData.companyId);

    if (candidatesReportsWithCompany.length) {
        const lastSubmittedReport = candidatesReportsWithCompany.shift();
        const { phase, status, date } = lastSubmittedReport;

        let hiringStatus;

        status === "Declined"
            ? hiringStatus = "Declined"
            : phase === "Final" && status === "Passed"
                ? hiringStatus = "Hired"
                : hiringStatus = "Select";

        return {
            currentPhase: phase,
            currentStatus: status,
            timeOfLastInterview: date,
            hiringStatus
        };
    } else {
        return {
            currentPhase: "none",
            currentStatus: "",
            timeOfLastInterview: null,
            hiringStatus: "Select"
        };
    }
};

const packFormInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    return {
        name,
        value
    };
};

const validateInput = input => {
    const { interviewDate, phase, status, note } = input;

    let isValid = true;
    let errors = {};

    if (!interviewDate) {
        errors = {...errors, dateError: "" };
        isValid = false;
    }

    if (phase === "Select") {
        errors = {...errors, phaseError: "" };
        isValid = false;
    }

    if (status === "Select") {
        errors = {...errors, statusError: "" };
        isValid = false;
    }

    if (!note) {
        errors = {...errors, noteError: "" };
        isValid = false;
    }

    return {
        isValid,
        errors
    };
};

const packDataForSubmission = data => {
    const { interviewDate, phase, status, note } = data;
    const date = "" + new Date(interviewDate);

    return {
        interviewDate: date,
        phase: phase.toLowerCase(),
        status: status.toLowerCase(),
        note: note
    };
};

const mapStateToProps = state => ({
    trackedData: getTrackedData(state.data.reports, state.newReportData),
    newReportFormData: state.newReportFormData,
    message: state.message,
    open: state.submitModal
});

const mapDispatchToProps = dispatch => ({
    onBack: () => {
        dispatch(decrementPhase());
        location.hash = "#/create-report/2";
    },
    handleDateChange: date => dispatch(receiveDateChange(date)),
    handleFormInputChange: event => dispatch(receiveNewReportFormInput(packFormInputChange(event))),
    validateInput: formData => {
        const validationResults = validateInput(formData);
        validationResults.isValid
            ? dispatch(startSubmitReport())
            : dispatch(newReportFormError(validationResults.errors));
    },
    close: () => dispatch(closeSubmitModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FillReport);