import { actionTypes } from "./actionTypes";

export function startFetchReports() {
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
        error: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
}

export function receiveInputChange(inputItem) {
    return {
        type: actionTypes.RECEIVE_INPUT_CHANGE,
        inputItem
    };
}

export function noFilterResults() {
    return {
        type: actionTypes.NO_FILTER_RESULTS,
        error: "No candidates or companies match the search criteria."
    };
}