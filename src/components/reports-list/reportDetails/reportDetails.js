import React from "react";

class ReportDetails extends React.Component {
    render() {
        const { report } = this.props;
        const { candidateName, companyName, date, phase, status, note } = report;

        return (
            <div>
                <h5 className="pb-3 bottom-line modal-title">{candidateName}</h5>

                <div className="row modal-dialog">
                    <div className="col-12 col-md-4">
                        <p className="mb-0">Company</p>
                        <h5>{companyName}</h5>
                        <p className="mb-0">Interview Date</p>
                        <h5>{date}</h5>
                        <p className="mb-0">Phase</p>
                        <h5 className="text-capitalize">{phase}</h5>
                        <p className="mb-0">Status</p>
                        <h5 className="text-capitalize mb-3">{status}</h5>
                    </div>

                    <div className="col-12 col-md-8">
                        <p className="mb-2">Notes</p>
                        <p className="text-justify notes" style={{ color: "black" }} >{note}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportDetails;