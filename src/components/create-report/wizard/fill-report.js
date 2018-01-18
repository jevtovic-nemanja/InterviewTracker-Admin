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
            status: "Select",
            note: "",
            submit: "disabled"
        };
    }

    bindEventHandlers() {
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => {
            prevState[name] = value;
            return prevState;
        });
    }

    render() {
        const show = this.props.phase === 3 ? "" : "d-none";

        const { interviewDate, phase, status, note, submit } = this.state;
        const today = moment(moment.now()).format("YYYY-MM-DD");
        console.log(this.state);
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
                    </div>
                </div>
                <div className="col-12 offset-sm-1 col-sm-10 offset-md-8 col-md-4 offset-lg-9 col-lg-3 offset-xl-10 col-xl-2">
                    <button type="button" className={`btn btn-submit w-100 ${submit}`} disabled={submit} onClick={this.onSubmit}>Submit</button>
                </div>
            </form >
        );
    }
}

export default FillReport;