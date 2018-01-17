import React from "react";

export const ReportDisplay = props => {
    const { id, candidate, company, date, status } = props.report;
    let buttonGroup = null;

    function viewReportDetails() {
        const id = buttonGroup.id;
        props.openDetailsModal(id);
    }

    function deleteReport() {
        const id = buttonGroup.id;
        props.deleteReport(id);
    }

    return (
        <div className="offset-1 col-10 offset-sm-0 col-sm-12 offset-md-1 col-md-10">
            <div className="card report-card position-relative mb-3">
                <div className="card-body pt-4">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4 side-line-sm">
                            <h5 className="mb-0 mt-2">{company}</h5>
                            <small>Company</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 side-line-lg">
                            <h5 className="mb-0 mt-2">{candidate}</h5>
                            <small>Candidate</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-2 side-line-sm">
                            <h5 className="mb-0 mt-2">{date}</h5>
                            <small>Interview Date</small>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-2">
                            <h5 className="text-capitalize mb-0 mt-2">{status}</h5>
                            <small>Status</small>
                        </div>
                    </div>
                </div>
                <div className="btn-group-report-card" id={id} ref={div => buttonGroup = div}>
                    <button type="button" className="btn btn-report-card" onClick={viewReportDetails} >
                        <i className="fa fa-eye fa-lg"></i>
                    </button>
                    <button type="button" className="btn btn-report-card" onClick={deleteReport} >
                        <i className="fa fa-times fa-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};