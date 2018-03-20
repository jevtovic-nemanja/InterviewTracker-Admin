import React from "react";
import { connect } from "react-redux";

import { Aside } from "../components/create-report/aside";

const mapStateToProps = state => {
    return {
        phase: state.createReportPhase,
        newReport: state.newReportData
    };
};

export default connect(mapStateToProps)(Aside);