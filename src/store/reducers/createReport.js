import { actionTypes } from "Store/actions/actionTypes";

import { DISABLED } from "Src/constants";

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

export const selectedElementId = (state = "", action) => {
    switch (action.type) {
    case actionTypes.SELECT_ELEMENT:
    case actionTypes.GO_TO_REPORTS_LIST:
        return action.selectedElementId;
    default:
        return state;
    }
};

export const enableNextPhase = (state = DISABLED, action) => {
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