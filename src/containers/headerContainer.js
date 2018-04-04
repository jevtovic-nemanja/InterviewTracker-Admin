import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Header } from "../components/common/header";
import { goToReportsList, goToCreateReport } from "../store/actions";

const mapDispatchToProps = dispatch => bindActionCreators({
    goToReportsList,
    goToCreateReport
}, dispatch);

export default connect(null, mapDispatchToProps)(Header);