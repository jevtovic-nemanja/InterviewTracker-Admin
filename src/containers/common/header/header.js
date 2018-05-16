import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
    goToReportsList,
    goToCreateReport
} from "Store/actions";

const mapDispatchToProps = dispatch => bindActionCreators({
    goToReportsList,
    goToCreateReport
}, dispatch);

const Navbar = ({ hash, goToReportsList, goToCreateReport }) => {
    let report = "btn-nav";
    let create = "btn-nav";

    hash === "#/"
        ? report = "btn-nav-active"
        : create = "btn-nav-active";

    return (
        <nav className="container-fluid">
            <div className="row p-3">

                <div className="col-7 offset-md-1 col-md-6">
                    <h4 className="d-block d-sm-none pt-1 font-italic">RAd</h4>
                    <h4 className="d-none d-sm-block pt-1">Reports Administration</h4>
                </div>

                <div className="col-5 col-md-4">
                    <div className="btn-group float-right">
                        <Link to="/">
                            <button className={`${report} btn rounded-0 reports`} onClick={goToReportsList}>Reports</button>
                        </Link>
                        <Link to="/create-report/">
                            <button className={`${create} btn rounded-0 create-report`} onClick={goToCreateReport}>Create Report</button>
                        </Link>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default connect(null, mapDispatchToProps)(Navbar);