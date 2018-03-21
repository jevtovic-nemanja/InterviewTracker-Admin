import React from "react";
import { connect } from "react-redux";

import { FillReport } from "../components/create-report/fillReport";

// const getTrackedData = (reports, newReportData) => {
//     const candidatesReportWithCompany = reports
//         .filter(report => report.)
// };

const mapStateToProps = state => ({
    trackedData: getTrackedData(state.reports, state.newReportData)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FillReport);