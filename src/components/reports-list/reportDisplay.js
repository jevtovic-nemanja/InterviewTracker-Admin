import React from "react";

export const ReportDisplay = props => {
    const { candidate, company, date, status } = props.report;

    return (
        <div className="offset-1 col-10 offset-sm-0 col-sm-12 offset-md-1 col-md-10">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <h5>{company}</h5>
                            <small>Company</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <h5>{candidate}</h5>
                            <small>Candidate</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <h5>{date}</h5>
                            <small>Interview Date</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-2">
                            <h5 className="text-capitalize">{status}</h5>
                            <small>Status</small>
                        </div>
                        <div className="col-12">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};