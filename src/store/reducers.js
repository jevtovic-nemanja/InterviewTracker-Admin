import { actionTypes } from "./actionTypes";

export function loading(state = false, action) {
    switch (action.type) {
    case actionTypes.START_FETCH_REPORTS:
    case actionTypes.FETCH_REPORTS_SUCCESS:
    case actionTypes.FETCH_REPORTS_FAIL:
        return action.loading;
    default:
        return state;
    }
}

export function reports(state = [], action) {
    switch (action.type) {
    case actionTypes.FETCH_REPORTS_SUCCESS:
        return action.reports;
    default:
        return state;
    }
}

export function message(state = "", action) {
    switch (action.type) {
    case actionTypes.START_FETCH_REPORTS:
    case actionTypes.FETCH_REPORTS_SUCCESS:
    case actionTypes.FETCH_REPORTS_FAIL:
    case actionTypes.START_DELETE_REPORT:
    case actionTypes.DELETE_REPORT_FAIL:
    case actionTypes.DELETE_REPORT_SUCCESS:
    case actionTypes.CLOSE_DELETE_MODAL:
        return action.message;
    default:
        return state;
    }
}

export function searchItem(state = "", action) {
    switch (action.type) {
    case actionTypes.RECEIVE_INPUT_CHANGE:
        return action.inputItem;
    default:
        return state;
    }
}

export function detailsModal(state = false, action) {
    switch (action.type) {
    case actionTypes.OPEN_DETAILS_MODAL:
        return true;
    case actionTypes.CLOSE_DETAILS_MODAL:
        return false;
    default:
        return state;
    }
}

export function detailedReport(state = {}, action) {
    switch (action.type) {
    case actionTypes.OPEN_DETAILS_MODAL:
        return action.detailedReport;
    default:
        return state;
    }
}

export function deleteModal(state = false, action) {
    switch (action.type) {
    case actionTypes.OPEN_DELETE_MODAL:
        return true;
    case actionTypes.CLOSE_DELETE_MODAL:
    case actionTypes.DELETE_REPORT_SUCCESS:
        return false;
    default:
        return state;
    }
}

export function deleteReportId(state = "", action) {
    switch (action.type) {
    case actionTypes.OPEN_DELETE_MODAL:
        return action.deleteReportId;
    default:
        return state;
    }
}

export function createReportPhase(state = 1, action) {
    switch (action.type) {
    default:
        return state;
    }
}

export function newReportData(state = {
    candidateName: "",
    companyName: ""
}, action) {
    switch (action.type) {
    default:
        return state;
    }
}