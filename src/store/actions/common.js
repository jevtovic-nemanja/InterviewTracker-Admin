import { actionTypes } from "./actionTypes";

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
    location.hash = "#";
    return {
        type: actionTypes.GO_TO_REPORTS_LIST,
        createReportPhase: 1,
        next: "disabled",
        selectedElementId: ""
    };
};

export const goToCreateReport = () => {
    location.hash === "#/create-report";
    return {
        type: actionTypes.GO_TO_CREATE_REPORT
    };
};