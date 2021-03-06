import React from "react";

import { connect } from "react-redux";

import styles from "./aside.css";

const mapStateToProps = state => {
    return {
        phase: state.createReportPhase,
        newReport: state.newReportData
    };
};

const Sidebar = ({ phase, newReport }) => {
    const { candidateName, companyName } = newReport;

    const marginBottom = phase === 1 ? "mb-3" : "";

    const candidate = phase === 1 ? "d-none" : "";
    const company = phase === 3 ? "" : "d-none";

    const selectCandidate = phase === 1 ? "font-weight-bold" : "text-muted d-none d-md-inline-block";
    const selectCompany = phase === 2 ? "font-weight-bold" : "text-muted d-none d-md-inline-block";
    const fillReport = phase === 3 ? "font-weight-bold" : "text-muted d-none d-md-inline-block";

    return (
        <div className={`row ${styles.wizardAside} h-100 ${marginBottom}`}>
            <div className="col-12">
                <div className={styles.bottomLineAside}>

                    <h5 className={`${selectCandidate} mt-2`}>
                        <small className={`${selectCandidate} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">1</strong>
                        </small>
                        <span className={`pl-2 ${styles.moveDown}`}>
                            Select Candidate
                        </span>
                    </h5>

                    <h5 className={`${selectCompany} mt-3`}>
                        <small className={`${selectCompany} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">2</strong>
                        </small>
                        <span className={`pl-2 ${styles.moveDown}`}>
                            Select Company
                        </span>
                    </h5>

                    <h5 className={`${fillReport} mt-3 mb-4`}>
                        <small className={`${fillReport} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">3</strong>
                        </small>
                        <span className={`pl-2 ${styles.moveDown}`}>
                            Fill Report Detail
                        </span>
                    </h5>

                </div>

                <div>
                    <div className={`${candidate} pl-1 candidate`}>
                        <p className="mt-3 mb-1">Candidate:</p>
                        <h4>{candidateName}</h4>
                    </div>

                    <div className={`${company} pl-1 company`}>
                        <p className="mb-1">Company:</p>
                        <h4>{companyName}</h4>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Sidebar);