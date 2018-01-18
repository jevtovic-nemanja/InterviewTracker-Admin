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
            date: moment(moment.now()).format("YYYY-MM-DD"),
            phase: "Select",
            status: "Select",
            notes: ""
        };
    }

    bindEventHandlers() {
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePhaseChange = this.handlePhaseChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
    }

    handleDateChange(event) {
        const pickedDate = event.target.value;
        this.setState({ date: pickedDate });
    }

    handlePhaseChange(event) {
        const pickedPhase = event.target.value;
        this.setState({ phase: pickedPhase });
    }

    handleStatusChange(event) {
        const pickedStatus = event.target.value;
        this.setState({ status: pickedStatus });
    }

    handleNotesChange(event) {
        const notes = event.target.value;
        this.setState({ notes: notes });
    }

    render() {
        const show = this.props.phase === 3 ? "" : "d-none";

        const { date, phase, status, notes } = this.state;
        const today = moment(moment.now()).format("YYYY-MM-DD");

        return (
            <form className={`${show} row fill-report`}>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 col-lg-4">
                    <div className="form-group">
                        <label>Interview Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            max={today}
                            value={date}
                            onChange={this.handleDateChange}
                        />
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label>Phase:</label>
                        <select
                            className="form-control"
                            value={phase}
                            onChange={this.handlePhaseChange}
                        >
                            <option hidden>Select</option>
                            <option>CV</option>
                            <option>HR</option>
                            <option>Technical</option>
                            <option>Final</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            className="form-control"
                            value={status}
                            onChange={this.handleStatusChange}
                        >
                            <option hidden>Select</option>
                            <option>Passed</option>
                            <option>Declined</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
                    <div className="form-group">
                        <label>Notes:</label>
                        <textarea
                            placeholder="Notes..."
                            rows="5"
                            className="form-control"
                            value={notes}
                            onChange={this.handleNotesChange}
                        />
                    </div>
                </div>
            </form >
        );
    }
}

export default FillReport;