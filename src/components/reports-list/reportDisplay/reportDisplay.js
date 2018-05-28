import React from "react";

import styles from "./reportDisplay.css";

export const ReportDisplay = ({ report, openDeleteModal, openDetailsModal }) => {
    const { id, candidateName, companyName, date, status } = report;

    return (
        <div className="offset-1 col-10 offset-sm-0 col-sm-12 offset-md-1 col-md-10">
            <div className={`card ${styles.reportCard} position-relative mb-3`}>

                <div className="card-body pt-4">
                    <div className="row">
                        <div className={`col-12 col-sm-6 col-lg-4 ${styles.sideLineSmall}`}>
                            <h5 className="mb-0 mt-2">{companyName}</h5>
                            <small>Company</small>
                        </div>

                        <div className={`col-12 col-sm-6 col-lg-3 ${styles.sideLineLarge}`}>
                            <h5 className="mb-0 mt-2">{candidateName}</h5>
                            <small>Candidate</small>
                        </div>

                        <div className={`col-12 col-sm-6 col-lg-2 ${styles.sideLineSmall}`}>
                            <h5 className="mb-0 mt-2">{date}</h5>
                            <small>Interview Date</small>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-2">
                            <h5 className="text-capitalize mb-0 mt-2">{status}</h5>
                            <small>Status</small>
                        </div>
                    </div>
                </div>

                <div className={styles.btnGroupReportCard}>
                    <button
                        type="button"
                        onClick={() => openDetailsModal(report)}
                        className={`btn ${styles.btnReportCard} btn-details`}
                    >
                        <i className="fa fa-eye fa-lg"></i>
                    </button>

                    <button
                        type="button"
                        onClick={() => openDeleteModal(id)}
                        className={`btn ${styles.btnReportCard} btn-delete-report`}
                    >
                        <i className="fa fa-times fa-lg"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};