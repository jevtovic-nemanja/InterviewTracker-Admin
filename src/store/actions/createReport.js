import { actionTypes } from "./actionTypes";

import { Messages, DISABLED } from "Src/constants";

export const selectElement = selectedElementId => {
    return {
        type: actionTypes.SELECT_ELEMENT,
        selectedElementId
    };
};

export const enableNextPhase = () => {
    return {
        type: actionTypes.ENABLE_NEXT_PHASE,
        next: ""
    };
};

export const incrementPhase = event => {
    return {
        type: actionTypes.INCREMENT_PHASE,
        next: DISABLED
    };
};

export const decrementPhase = event => {
    return {
        type: actionTypes.DECREMENT_PHASE,
        next: ""
    };
};

export const newReportCandidate = newReportCandidate => {
    return {
        type: actionTypes.NEW_REPORT_CANDIDATE,
        newReportCandidate
    };
};

export const newReportCompany = newReportCompany => {
    return {
        type: actionTypes.NEW_REPORT_COMPANY,
        newReportCompany
    };
};

export const startSubmitReport = formData => {
    return {
        type: actionTypes.START_SUBMIT_REPORT,
        formData
    };
};

export const submitReportSuccess = () => {
    return {
        type: actionTypes.SUBMIT_REPORT_SUCCESS,
        message: ""
    };
};

export const submitReportFail = () => {
    return {
        type: actionTypes.SUBMIT_REPORT_FAIL,
        message: Messages.ERROR
    };
};