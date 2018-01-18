import React from "react";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FillReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            interviewDate: null,
            dateError: "d-none",
            phase: "Select",
            phaseError: "d-none",
            status: "Select",
            statusError: "d-none",
            note: "",
            noteError: "d-none",
            trackedData: {}
        };
    }

    bindEventHandlers() {
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.getTrackedData();
        if (this.state.status === "Declined") {
            this.setState({ status: "Select " });
        }
    }

    getTrackedData() {
        const candidateWithCompany = this.props.candidatesReports.filter(report => report.companyId === this.props.companyId);
        const phases = candidateWithCompany.map(report => report.phase.toLowerCase());

        let currentPhase = "";
        
        if (phases.includes("final")) {
            currentPhase = "final";
        } else if (phases.includes("tech")) {
            currentPhase = "tech";
        } else if (phases.includes("hr")) {
            currentPhase = "hr";
        } else if (phases.includes("cv")) {
            currentPhase = "cv";
        } else currentPhase = "none";
        
        const currentReport = candidateWithCompany.filter(report => report.phase.toLowerCase() === currentPhase);

        let currentStatus = "";
        let timeOfLastInterview = null;

        if (currentReport.length) {
            currentStatus = currentReport[0].status.toLowerCase();
            timeOfLastInterview = currentReport[0].interviewDate;
        }

        if (currentStatus === "declined") {
            this.setState({ status: "Declined" });
        } 
        
        if (currentPhase === "final" && currentStatus === "passed") {
            this.setState({ status: "Hired" });
        }

        this.setState({
            trackedData: {
                currentPhase: currentPhase,
                currentStatus: currentStatus,
                timeOfLastInterview: timeOfLastInterview
            }
        });
    }

    handleDateChange(date) {
        this.setState({
            interviewDate: date,
            dateError: "d-none",
            phaseError: "d-none",
            statusError: "d-none",
            noteError: "d-none"
        });
    }

    handleInputChange(event) {
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

    onSubmit(event) {
        event.preventDefault();

        const { interviewDate, phase, status, note } = this.state;
        const date = "" + new Date(interviewDate);

        const data = {
            interviewDate: date,
            phase: phase,
            status: status,
            note: note
        };

        const isValid = this.validateInput();

        if (isValid) {
            this.props.onSubmit(data);
        }
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

    render() {
        const show = this.props.phase === 3 ? "" : "d-none";
        const { interviewDate, dateError, phase, phaseError, status, statusError, note, noteError, trackedData } = this.state;

        const today = moment();
        const timeOfLastInterview = moment(trackedData.timeOfLastInterview);

        let declined = "";

        if (trackedData.currentStatus === "declined" || status === "Hired") {
            declined = "disabled";
        }

        const declinedDatePicker = declined === "disabled"
            ? true
            : false;

        let hideCv = "d-none";
        let hideHr = "d-none";
        let hideTech = "d-none";
        let hideFinal = "d-none";

        switch(trackedData.currentPhase) {
        case "none":
            hideCv = "";
            break;
        case "cv":
            hideHr = "";
            break;
        case "hr":
            hideTech = "";
            break;
        case "tech":
            hideFinal = "";
            break;
        }

        return (
            <form className={`${show} row fill-report`}>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4">
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                            dateFormat="DD.MM.YYYY"
                            placeholderText="Click to select a date"
                            selected={interviewDate}
                            maxDate={today}
                            minDate={timeOfLastInterview}
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
                            <option className={`${hideCv}`}>CV</option>
                            <option className={`${hideHr}`}>HR</option>
                            <option className={`${hideTech}`}>Tech</option>
                            <option className={`${hideFinal}`}>Final</option>
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
                            <option hidden>Select</option>
                            <option hidden>Hired</option>
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
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-8 col-md-4 offset-lg-9 col-lg-3 offset-xl-10 col-xl-2">
                    <button
                        type="button"
                        onClick={this.onSubmit}
                        className="btn btn-submit w-100"
                    >Submit</button>
                </div>
            </form >
        );
    }
}

export default FillReport;