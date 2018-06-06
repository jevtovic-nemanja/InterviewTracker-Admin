import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { NavLink, withRouter } from "react-router-dom";

import {
    goToReportsList,
    goToCreateReport
} from "Store/actions";

import styles from "./header.css";

import { Routes } from "Src/constants";

const mapDispatchToProps = dispatch => bindActionCreators({
    goToReportsList,
    goToCreateReport
}, dispatch);

const Navbar = ({ goToReportsList, goToCreateReport }) => {
    return (
        <nav className={`container-fluid ${styles.nav}`}>
            <div className="row p-3">

                <div className="col-7 offset-md-1 col-md-6">
                    <h4 className="d-block d-sm-none pt-1 font-italic">RAd</h4>
                    <h4 className="d-none d-sm-block pt-1">Reports Administration</h4>
                </div>

                <div className="col-5 col-md-4">
                    <div className="btn-group float-right">
                        <NavLink to={Routes.REPORTS_LIST} exact className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <button className="btn rounded-0 reports" onClick={goToReportsList}>Reports</button>
                        </NavLink>
                        <NavLink to={Routes.CREATE_REPORT_CANDIDATES} className={styles.navLink} activeClassName={styles.navLinkActive}>
                            <button className="btn rounded-0 create-report" onClick={goToCreateReport}>Create Report</button>
                        </NavLink>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));