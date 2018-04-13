import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Navbar } from "Components/common/navbar";

import {
    goToReportsList,
    goToCreateReport
} from "Store/actions/index";

const mapDispatchToProps = dispatch => bindActionCreators({
    goToReportsList,
    goToCreateReport
}, dispatch);

export default connect(null, mapDispatchToProps)(Navbar);