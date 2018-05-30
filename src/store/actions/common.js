import { actionTypes } from "./actionTypes";

import { DISABLED } from "Src/constants";

export const receiveInputChange = inputItem => {
    return {
        type: actionTypes.RECEIVE_INPUT_CHANGE,
        inputItem
    };
};

export const openMessageModal = () => {
    return {
        type: actionTypes.OPEN_MESSAGE_MODAL,
        messageModal: true
    };
};

export const closeMessageModal = () => {
    return {
        type: actionTypes.CLOSE_MESSAGE_MODAL,
        messageModal: false,
        message: ""
    };
};

export const goToReportsList = () => {
    return {
        type: actionTypes.GO_TO_REPORTS_LIST,
        createReportPhase: 1,
        next: DISABLED,
        selectedElementId: ""
    };
};

export const goToCreateReport = () => {
    return {
        type: actionTypes.GO_TO_CREATE_REPORT
    };
};