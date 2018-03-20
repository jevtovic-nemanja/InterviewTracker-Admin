import { actionTypes } from "./actionTypes";

export function startFetchReports() {
    return {
        type: actionTypes.START_FETCH_REPORTS,
        loading: true,
        message: "Loading..."
    };
}

export function fetchReportsSuccess(reports) {
    return {
        type: actionTypes.FETCH_REPORTS_SUCCESS,
        loading: false,
        reports,
        message: ""
    };
}

export function fetchReportsFail() {
    return {
        type: actionTypes.FETCH_REPORTS_FAIL,
        loading: false,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
}

export function receiveInputChange(inputItem) {
    return {
        type: actionTypes.RECEIVE_INPUT_CHANGE,
        inputItem
    };
}

export function openDetailsModal(detailedReport) {
    return {
        type: actionTypes.OPEN_DETAILS_MODAL,
        detailedReport
    };
}

export function closeDetailsModal() {
    return {
        type: actionTypes.CLOSE_DETAILS_MODAL
    };
}

export function openDeleteModal(deleteReportId) {
    return {
        type: actionTypes.OPEN_DELETE_MODAL,
        deleteReportId
    };
}

export function closeDeleteModal() {
    return {
        type: actionTypes.CLOSE_DELETE_MODAL,
        message: ""
    };
}

export function startDeleteReport() {
    return {
        type: actionTypes.START_DELETE_REPORT,
        message: ""
    };
}

export function deleteReportSuccess() {
    return {
        type: actionTypes.DELETE_REPORT_SUCCESS,
        message: ""
    };
}

export function deleteReportFail() {
    return {
        type: actionTypes.DELETE_REPORT_FAIL,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
}