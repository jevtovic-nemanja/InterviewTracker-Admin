import { actionTypes } from "./actionTypes";

export function startFetchReports() {
    return {
        type: actionTypes.START_FETCH_REPORTS,
        message: "Loading..."
    };
}

export function fetchReportsSuccess(reports) {
    return {
        type: actionTypes.FETCH_REPORTS_SUCCESS,
        reports,
        message: ""
    };
}

export function fetchReportsFail() {
    return {
        type: actionTypes.FETCH_REPORTS_FAIL,
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

export function startFetchCandidates() {
    return {
        type: actionTypes.START_FETCH_CANDIDATES,
        message: "Loading..."
    };
}

export function fetchCandidatesSuccess(candidates) {
    return {
        type: actionTypes.FETCH_CANDIDATES_SUCCESS,
        candidates,
        message: ""
    };
}

export function fetchCandidatesFail() {
    return {
        type: actionTypes.FETCH_CANDIDATES_FAIL,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
}

export function startFetchCompanies() {
    return {
        type: actionTypes.START_FETCH_COMPANIES,
        message: "Loading..."
    };
}

export function fetchCompaniesSuccess(companies) {
    return {
        type: actionTypes.FETCH_COMPANIES_SUCCESS,
        companies,
        message: ""
    };
}

export function fetchCompaniesFail() {
    return {
        type: actionTypes.FETCH_COMPANIES_FAIL,
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
        type: actionTypes.INCREMENT_PHASE
    };
}

export function decrementPhase() {
    return {
        type: actionTypes.DECREMENT_PHASE
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