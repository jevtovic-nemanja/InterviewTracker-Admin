import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Navbar } from "../../components/common/navbar";

import { goToReportsList, goToCreateReport } from "../../store/actions/actions";

const mapDispatchToProps = dispatch => bindActionCreators({
    goToReportsList,
    goToCreateReport
}, dispatch);

export default connect(null, mapDispatchToProps)(Navbar);