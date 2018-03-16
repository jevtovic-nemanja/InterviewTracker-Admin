import { actionTypes } from "./actionTypes";

function startFetchReports() {
    return {
        type: actionTypes.START_FETCH_REPORTS,
        loading: true
    };
}

export function fetchReportsSuccess(reports) {
    return {
        type: actionTypes.FETCH_REPORTS_SUCCESS,
        loading: false,
        reports
    };
}

export function fetchReportsFail(error) {
    return {
        type: actionTypes.FETCH_REPORTS_FAIL,
        loading: false,
        error
    };
}