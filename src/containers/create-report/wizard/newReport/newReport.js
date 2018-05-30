import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Modal from "react-responsive-modal";

import { MessageModal } from "Components/common/messageModal/messageModal";
import { BackButton } from "Components/common/buttons/back/backButton";
import { SubmitButton } from "Components/common/buttons/submit/submitButton";
import { ValidationError } from "Components/create-report/wizard/newReport/validationError/validationError";
import { CustomDatePicker } from "Components/create-report/wizard/newReport/datePicker/datePicker";
import { Select } from "Components/create-report/wizard/newReport/select/select";
import { Notes } from "Components/create-report/wizard/newReport/notes/notes";

import { Messages, Routes, Phases } from "Src/constants";
import { capitalizeString } from "Utils/capitalizeString";

import {
    startSubmitReport,
    decrementPhase,
    closeMessageModal
} from "Store/actions";

import styles from "./newReport.css";

const getTrackedData = (reports, newReportData) => {
    const candidatesReportsWithCompany = reports.filter(report => report.candidateId === newReportData.candidateId && report.companyId === newReportData.companyId);

    if (candidatesReportsWithCompany.length) {
        const lastSubmittedReport = candidatesReportsWithCompany.shift();
        const { phase, status, date } = lastSubmittedReport;

        let hiringStatus;

        status === "declined"
            ? hiringStatus = "Declined"
            : phase === Phases.FINAL && status === "passed"
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
            currentPhase: Phases.NONE,
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

class ReportForm extends React.Component {
    state = {
        interviewDate: null,
        dateError: "d-none",
        phase: "Select",
        phaseError: "d-none",
        status: "Select",
        statusError: "d-none",
        note: "",
        noteError: "d-none"
    }

    handleDateChange = date => {
        this.setState({
            interviewDate: date,
            dateError: "d-none",
            phaseError: "d-none",
            statusError: "d-none",
            noteError: "d-none"
        });
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            prevState[name] = value;
            prevState.dateError = "d-none";
            prevState.phaseError = "d-none";
            prevState.statusError = "d-none";
            prevState.noteError = "d-none";
            return prevState;
        });
    }

    validateInput() {
        const { interviewDate, phase, status, note } = this.state;

        let isValid = true;

        if (!interviewDate) {
            this.setState({ dateError: "" });
            isValid = false;
        }

        if (phase === "Select") {
            this.setState({ phaseError: "" });
            isValid = false;
        }

        if (status === "Select") {
            this.setState({ statusError: "" });
            isValid = false;
        }

        if (!note) {
            this.setState({ noteError: "" });
            isValid = false;
        }

        return isValid;
    }

    onSubmit = event => {
        event.preventDefault();

        const isValid = this.validateInput();

        if (isValid) {
            const { interviewDate, phase, status, note } = this.state;
            const { trackedData, startSubmitReport } = this.props;
            const { candidateId, candidateName, companyId, companyName } = trackedData;

            const date = "" + new Date(interviewDate);

            const data = {
                candidateId,
                candidateName,
                companyId,
                companyName,
                interviewDate: date,
                phase: phase.toLowerCase(),
                status: status.toLowerCase(),
                note
            };

            startSubmitReport(data);
        }
    }

    closeMessageModal = () => {
        const { open, closeMessageModal } = this.props;

        if (open) {
            closeMessageModal();
        }
    }

    render() {
        const { trackedData, message, open } = this.props;
        const { decrementPhase } = this.props;

        const { currentPhase, currentStatus, timeOfLastInterview, hiringStatus } = trackedData;
        const { interviewDate, dateError, phase, phaseError, status, statusError, note, noteError } = this.state;

        const declined = (currentStatus === "declined" || hiringStatus === "Hired") ? "disabled" : "";
        const declinedDatePicker = declined ? true : false;

        const phases = Object.values(Phases);
        const nextPhase = capitalizeString(phases[phases.indexOf(currentPhase) + 1]);

        return (
            <form className={`row ${styles.fillReport}`}>

                <div className="col-12 offset-sm-1 col-sm-10 d-md-none">
                    <BackButton decrementPhase={decrementPhase} newLocation={Routes.CREATE_REPORT_COMPANIES} />
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4 mt-1">
                    <div className="form-group">
                        <CustomDatePicker
                            interviewDate={interviewDate}
                            timeOfLastInterview={timeOfLastInterview}
                            handleDateChange={this.handleDateChange}
                            disabled={declinedDatePicker}
                        />
                        <ValidationError isValid={dateError} text={Messages.validationErrorMessages.DATE_ERROR} />
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <Select
                            labelText="Phase:"
                            name="phase"
                            value={phase}
                            onChange={this.handleInputChange}
                            declined={declined}
                            options={["Select", nextPhase]}
                        />
                        <ValidationError isValid={phaseError} text={Messages.validationErrorMessages.PHASE_ERROR} />
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <Select
                            labelText="Status:"
                            name="status"
                            value={status}
                            onChange={this.handleInputChange}
                            declined={declined}
                            options={[hiringStatus, "Passed", "Declined"]}
                        />
                        <ValidationError isValid={statusError} text={Messages.validationErrorMessages.STATUS_ERROR} />
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
                    <div className="form-group">
                        <Notes
                            labelText="Notes:"
                            value={note}
                            onChange={this.handleInputChange}
                            declined={declined}
                        />
                        <ValidationError isValid={noteError} text={Messages.validationErrorMessages.NOTE_ERROR} />
                    </div>
                </div>

                <div className="d-none d-md-block col-md-4 col-lg-3">
                    <BackButton decrementPhase={decrementPhase} newLocation={Routes.CREATE_REPORT_COMPANIES} />
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                    <SubmitButton declined={declined} onSubmit={this.onSubmit} />
                </div>

                <Modal open={open} onClose={this.closeMessageModal} little >
                    <MessageModal message={message} close={this.closeMessageModal} />
                </Modal>

            </form >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);