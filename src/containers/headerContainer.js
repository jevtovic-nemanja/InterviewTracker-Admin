import React from "react";
import { connect } from "react-redux";

import { Header } from "../components/common/header";
import { goToReportsList, goToCreateReport } from "../store/actions";

const mapDispatchToProps = dispatch => ({
    toReportsList: () => dispatch(goToReportsList()),
    toCreateReport: () => dispatch(goToCreateReport())
});

export default connect(null, mapDispatchToProps)(Header);