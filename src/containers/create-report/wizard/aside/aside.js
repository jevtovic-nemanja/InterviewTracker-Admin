import React from "react";

import { connect } from "react-redux";

import { Sidebar } from "../../../../components/create-report/wizard/sidebar/sidebar";

const mapStateToProps = state => {
    return {
        phase: state.createReportPhase,
        newReport: state.newReportData
    };
};

export default connect(mapStateToProps)(Sidebar);