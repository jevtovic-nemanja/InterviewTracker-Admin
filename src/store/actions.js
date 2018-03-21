import { actionTypes } from "./actionTypes";

export function startFetchData() {
    return {
        type: actionTypes.START_FETCH_DATA,
        message: "Loading..."
    };
}

export function fetchDataSuccess(data) {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data,
        message: ""
    };
}

export function fetchDataFail() {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
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
        message: "Loading..."
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

export function selectElement(selectedElementId) {
    return {
        type: actionTypes.SELECT_ELEMENT,
        selectedElementId
    };
}

export function enableNextPhase() {
    return {
        type: actionTypes.ENABLE_NEXT_PHASE,
        next: ""
    };
}

export function incrementPhase() {
    return {
        type: actionTypes.INCREMENT_PHASE,
        next: "disabled"
    };
}

export function decrementPhase() {
    return {
        type: actionTypes.DECREMENT_PHASE,
        next: ""
    };
}

export function newReportCandidate(newReportCandidate) {
    return {
        type: actionTypes.NEW_REPORT_CANDIDATE,
        newReportCandidate
    };
}

export function newReportCompany(newReportCompany) {
    return {
        type: actionTypes.NEW_REPORT_COMPANY,
        newReportCompany
    };
}

export function receiveDateChange(date) {
    return {
        type: actionTypes.RECEIVE_DATE_CHANGE,
        date
    };
}

export function receiveNewReportFormInput(input) {
    return {
        type: actionTypes.RECEIVE_NEW_REPORT_FORM_INPUT,
        input
    };
}

export function startSubmitReport() {
    return {
        type: actionTypes.START_SUBMIT_REPORT
    };
}

export function submitReportSuccess() {
    location.hash = "#/";
    return {
        type: actionTypes.SUBMIT_REPORT_SUCCESS,
        message: ""
    };
}

export function submitReportFail() {
    return {
        type: actionTypes.SUBMIT_REPORT_FAIL,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
}

export function newReportFormError(errors) {
    return {
        type: actionTypes.NEW_REPORT_FORM_ERROR,
        errors
    };
}

export function openSubmitModal() {
    return {
        type: actionTypes.OPEN_SUBMIT_MODAL,
        submitModal: true
    };
}

export function closeSubmitModal() {
    return {
        type: actionTypes.CLOSE_SUBMIT_MODAL,
        submitModal: false,
        message: ""
    };
}