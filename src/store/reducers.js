import { actionTypes } from "./actionTypes";

export function loading(state = false, action) {
    switch (action.type) {
    case actionTypes.START_FETCH_REPORTS:
        return action.loading;
    default:
        return state;
    }
}

export function reports(state = [], action) {
    switch (action.type) {
    case actionTypes.FETCH_REPORTS_SUCCESS:
        return action.reports;
    case actionTypes.FETCH_REPORTS_FAIL:
        return action.error;
    default:
        return state;
    }
}