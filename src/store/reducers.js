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

export function filteredReports(state = [], action) {
    switch (action.type) {
    case actionTypes.FETCH_REPORTS_SUCCESS:
        return action.reports;
    case actionTypes.FILTER_REPORTS_SUCCESS:
    case actionTypes.FILTER_REPORTS_FAIL:
        return action.filteredReports;
    default:
        return state;
    }
}

export function error(state = "", action) {
    switch (action.type) {
    case actionTypes.FETCH_REPORTS_FAIL:
    case actionTypes.NO_FILTER_RESULTS:
        return action.error;
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