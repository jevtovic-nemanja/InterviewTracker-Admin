import { actionTypes } from "./actionTypes";

const dataInitState = {
    reports: [],
    candidates: [],
    companies: []
};

export function data(state = dataInitState, action) {
    switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
        return action.data;
    default:
        return state;
    }
}

export function message(state = "", action) {
    switch (action.type) {
    case actionTypes.START_FETCH_DATA:
    case actionTypes.FETCH_DATA_SUCCESS:
    case actionTypes.FETCH_DATA_FAIL:
    case actionTypes.START_DELETE_REPORT:
    case actionTypes.DELETE_REPORT_FAIL:
    case actionTypes.DELETE_REPORT_SUCCESS:
    case actionTypes.CLOSE_DELETE_MODAL:
    case actionTypes.SUBMIT_REPORT_SUCCESS:
    case actionTypes.SUBMIT_REPORT_FAIL:
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
}

const newReportDataInitState = {
    candidateName: "",
    companyName: ""
};

export function newReportData(state = newReportDataInitState, action) {
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
}

export function selectedElementId(state = "", action) {
    switch (action.type) {
    case actionTypes.SELECT_ELEMENT:
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.selectedElementId;
    default:
        return state;
    }
}

export function enableNextPhase(state = "disabled", action) {
    switch (action.type) {
    case actionTypes.ENABLE_NEXT_PHASE:
    case actionTypes.INCREMENT_PHASE:
    case actionTypes.DECREMENT_PHASE:
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.next;
    default:
        return state;
    }
}

const newReportFormDataInitState = {
    interviewDate: null,
    dateError: "d-none",
    phase: "Select",
    phaseError: "d-none",
    status: "Select",
    statusError: "d-none",
    note: "",
    noteError: "d-none"
};

export function newReportFormData(state = newReportFormDataInitState, action) {
    switch (action.type) {
    case actionTypes.RECEIVE_DATE_CHANGE:
        return {
            ...state,
            interviewDate: action.date,
            dateError: "d-none",
            phaseError: "d-none",
            statusError: "d-none",
            noteError: "d-none"
        };
    case actionTypes.RECEIVE_NEW_REPORT_FORM_INPUT:
        return {
            ...state,
            [action.input.name]: action.input.value,
            dateError: "d-none",
            phaseError: "d-none",
            statusError: "d-none",
            noteError: "d-none"
        };
    case actionTypes.NEW_REPORT_FORM_ERROR:
        return {
            ...state,
            ...action.errors
        };
    case actionTypes.SUBMIT_REPORT_SUCCESS:
    case actionTypes.GO_TO_REPORTS_LIST:
        return newReportFormDataInitState;
    default:
        return state;
    }
}

export function submitModal(state = false, action) {
    switch (action.type) {
    case actionTypes.OPEN_SUBMIT_MODAL:
        return true;
    case actionTypes.CLOSE_SUBMIT_MODAL:
        return false;
    default:
        return state;
    }
}