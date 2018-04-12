import { actionTypes } from "../actions/actionTypes";

const dataInitState = {
    reports: [],
    candidates: [],
    companies: []
};

export const data = (state = dataInitState, action) => {
    switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
        return action.data;
    default:
        return state;
    }
};

export const message = (state = "", action) => {
    switch (action.type) {
    case actionTypes.START_FETCH_DATA:
    case actionTypes.FETCH_DATA_SUCCESS:
    case actionTypes.FETCH_DATA_FAIL:
    case actionTypes.START_DELETE_REPORT:
    case actionTypes.DELETE_REPORT_FAIL:
    case actionTypes.DELETE_REPORT_SUCCESS:
    case actionTypes.SUBMIT_REPORT_SUCCESS:
    case actionTypes.SUBMIT_REPORT_FAIL:
    case actionTypes.CLOSE_MESSAGE_MODAL:
        return action.message;
    default:
        return state;
    }
};

export const searchItem = (state = "", action) => {
    switch (action.type) {
    case actionTypes.RECEIVE_INPUT_CHANGE:
        return action.inputItem;
    default:
        return state;
    }
};

export const createReportPhase = (state = 1, action) => {
    switch (action.type) {
    case actionTypes.INCREMENT_PHASE:
        return state + 1;
    case actionTypes.DECREMENT_PHASE:
        return state - 1;
    case actionTypes.SUBMIT_REPORT_SUCCESS:
        return 1;
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.createReportPhase;
    default:
        return state;
    }
};

const newReportDataInitState = {
    candidateName: "",
    companyName: ""
};

export const newReportData = (state = newReportDataInitState, action) => {
    switch (action.type) {
    case actionTypes.NEW_REPORT_CANDIDATE:
        return {
            ...state,
            candidateId: action.newReportCandidate.candidateId,
            candidateName: action.newReportCandidate.name
        };
    case actionTypes.NEW_REPORT_COMPANY:
        return {
            ...state,
            companyId: action.newReportCompany.companyId,
            companyName: action.newReportCompany.name
        };
    case actionTypes.SUBMIT_REPORT_SUCCESS:
    case actionTypes.GO_TO_REPORTS_LIST:
        return newReportDataInitState;
    default:
        return state;
    }
};

export const selectedElementId = (state = "", action) => {
    switch (action.type) {
    case actionTypes.SELECT_ELEMENT:
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.selectedElementId;
    default:
        return state;
    }
};

export const enableNextPhase = (state = "disabled", action) => {
    switch (action.type) {
    case actionTypes.ENABLE_NEXT_PHASE:
    case actionTypes.INCREMENT_PHASE:
    case actionTypes.DECREMENT_PHASE:
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.next;
    default:
        return state;
    }
};

export const messageModal = (state = false, action) => {
    switch (action.type) {
    case actionTypes.OPEN_MESSAGE_MODAL:
        return true;
    case actionTypes.CLOSE_MESSAGE_MODAL:
        return false;
    default:
        return state;
    }
};