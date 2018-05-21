import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Modal from "react-responsive-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MessageModal } from "Components/common/messageModal/messageModal";
import { BackButton } from "Components/common/buttons/back/backButton";

import moment from "moment";

import { capitalizeString } from "Utils/capitalizeString";

import {
    startSubmitReport,
    decrementPhase,
    closeMessageModal
} from "Store/actions";

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

        const phases = ["none", "cv", "hr", "tech", "final", "hired"];
        const nextPhase = capitalizeString(phases[phases.indexOf(currentPhase.toLowerCase()) + 1]);

        return (
            <form className="row fill-report">

                <div className="col-12 offset-sm-1 col-sm-10 d-md-none">
                    <BackButton decrementPhase={decrementPhase} newLocation="#/create-report/2" />
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4 mt-1">
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                            dateFormat="DD.MM.YYYY"
                            placeholderText="Click to select a date"
                            selected={interviewDate}
                            maxDate={moment()}
                            minDate={moment(timeOfLastInterview, "DD-MM-YYYY")}
                            onChange={this.handleDateChange}
                            className="pl-2 form-control"
                            disabled={declinedDatePicker}
                        />

                        <div className={`${dateError} float-right pr-2`}>
                            <small className="red">Please select a date.</small>
                        </div>
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label>Phase:</label>
                        <select
                            name="phase"
                            value={phase}
                            onChange={this.handleInputChange}
                            className="form-control"
                            disabled={declined}
                        >
                            <option hidden>Select</option>
                            <option>{nextPhase}</option>
                        </select>

                        <div className={`${phaseError} float-right pr-2`}>
                            <small className="red">Please select a phase.</small>
                        </div>
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={status}
                            onChange={this.handleInputChange}
                            className="form-control"
                            disabled={declined}
                        >
                            <option hidden>{hiringStatus}</option>
                            <option>Passed</option>
                            <option>Declined</option>
                        </select>

                        <div className={`${statusError} float-right pr-2`}>
                            <small className="red">Please select a status.</small>
                        </div>
                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
                    <div className="form-group">
                        <label>Notes:</label>
                        <textarea
                            name="note"
                            rows="5"
                            placeholder="Notes..."
                            value={note}
                            onChange={this.handleInputChange}
                            className="form-control"
                            disabled={declined}
                        />

                        <div className={`${noteError} float-right pr-2`}>
                            <small className="red">Please enter notes.</small>
                        </div>
                    </div>
                </div>

                <div className="d-none d-md-block col-md-4 col-lg-3">
                    <BackButton decrementPhase={decrementPhase} newLocation="#/create-report/2" />
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                    <button
                        type="button"
                        disabled={declined}
                        onClick={this.onSubmit}
                        className={`btn btn-submit w-100 mt-1 ${declined}`}
                    >Submit</button>
                </div>

                <Modal open={open} onClose={this.closeMessageModal} little >
                    <MessageModal message={message} close={this.closeMessageModal} />
                </Modal>

            </form >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);