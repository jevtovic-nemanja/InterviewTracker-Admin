import React from "react";

import moment from "moment";

class FillReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            interviewDate: moment(moment.now()).format("YYYY-MM-DD"),
            phase: "Select",
            phaseError: "d-none",
            status: "Select",
            statusError: "d-none",
            note: "",
            noteError: "d-none"
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => {
            prevState[name] = value;
            prevState.phaseError = "d-none";
            prevState.statusError = "d-none";
            prevState.noteError = "d-none";
            return prevState;
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const { interviewDate, phase, status, note } = this.state;
        const data = {
            interviewDate: interviewDate,
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
        const { phase, status, note } = this.state;

        let isValid = true;

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

        const { interviewDate, phase, phaseError, status, statusError, note, noteError, submit } = this.state;
        const today = moment(moment.now()).format("YYYY-MM-DD");

        return (
            <form className={`${show} row fill-report`}>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4">
                    <div className="form-group">
                        <label>Interview Date:</label>
                        <input
                            name="interviewDate"
                            type="date"
                            className="form-control"
                            max={today}
                            value={interviewDate}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label>Phase:</label>
                        <select
                            name="phase"
                            className="form-control"
                            value={phase}
                            onChange={this.handleInputChange}
                        >
                            <option hidden>Select</option>
                            <option>CV</option>
                            <option>HR</option>
                            <option>Technical</option>
                            <option>Final</option>
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
                            className="form-control"
                            value={status}
                            onChange={this.handleInputChange}
                        >
                            <option hidden>Select</option>
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
                            placeholder="Notes..."
                            rows="5"
                            className="form-control"
                            value={note}
                            onChange={this.handleInputChange}
                        />
                        <div className={`${noteError} float-right pr-2`}>
                            <small className="red">Please enter notes.</small>
                        </div>
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-8 col-md-4 offset-lg-9 col-lg-3 offset-xl-10 col-xl-2">
                    <button type="button" className="btn btn-submit w-100" onClick={this.onSubmit}>Submit</button>
                </div>
            </form >
        );
    }
}

export default FillReport;