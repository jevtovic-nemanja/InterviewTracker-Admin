import React from "react";

import { Link } from "react-router-dom";

export const Header = props => {
    let report = "btn-nav";
    let create = "btn-nav";

    location.hash === "#/"
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
                            <button className={`btn rounded-0 ${report}`}>Reports</button>
                        </Link>
                        <Link to="/create-report">
                            <button className={`btn rounded-0 ${create}`}>Create Report</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};