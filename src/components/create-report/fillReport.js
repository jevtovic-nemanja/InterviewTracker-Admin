import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FillReport = () => {
    const { interviewDate, dateError, phase, phaseError, status, statusError, note, noteError } = this.state;

    const { timeOfLastInterview, currentPhase, currentStatus, hiringStatus } = this.props.trackedData;
    const today = moment();
    const lastInterview = moment(timeOfLastInterview);

    const declined = (currentStatus === "declined" || hiringStatus === "Hired") ? "disabled" : "";
    const declinedDatePicker = declined ? true : false;

    const phases = ["none", "cv", "hr", "tech", "final", "hired"];
    const nextPhase = capitalizeString(phases[phases.indexOf(currentPhase) + 1]);

    return (
        <form className="row fill-report">

            <div className="col-12 offset-sm-1 col-sm-10 d-md-none">
                <button
                    type="button"
                    onClick={this.props.onBack}
                    className="btn btn-back w-100 mb-2"
                >Back</button>
            </div>

            <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4 mt-1">
                <div className="form-group">
                    <label>Date:</label>
                    <DatePicker
                        dateFormat="DD.MM.YYYY"
                        placeholderText="Click to select a date"
                        selected={interviewDate}
                        maxDate={today}
                        minDate={lastInterview}
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
                <button
                    type="button"
                    onClick={this.props.onBack}
                    className="btn btn-back w-100 mb-2"
                >Back</button>
            </div>

            <div className="col-12 offset-sm-1 col-sm-10 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                <button
                    type="button"
                    disabled={declined}
                    onClick={this.onSubmit}
                    className={`btn btn-submit w-100 mt-1 ${declined}`}
                >Submit</button>
            </div>

        </form >
    );
};