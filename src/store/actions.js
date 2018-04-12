import { actionTypes } from "./actionTypes";

export const startFetchData = () => {
    return {
        type: actionTypes.START_FETCH_DATA,
        message: "Loading..."
    };
};

export const fetchDataSuccess = data => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data,
        message: ""
    };
};

export const fetchDataFail = () => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
};

export const receiveInputChange = inputItem => {
    return {
        type: actionTypes.RECEIVE_INPUT_CHANGE,
        inputItem
    };
};

export const startDeleteReport = id => {
    return {
        type: actionTypes.START_DELETE_REPORT,
        message: "Loading...",
        id
    };
};

export const deleteReportSuccess = () => {
    return {
        type: actionTypes.DELETE_REPORT_SUCCESS,
        message: ""
    };
};

export const deleteReportFail = () => {
    return {
        type: actionTypes.DELETE_REPORT_FAIL,
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
};

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

export const incrementPhase = () => {
    return {
        type: actionTypes.INCREMENT_PHASE,
        next: "disabled"
    };
};

export const decrementPhase = () => {
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

export const receiveDateChange = date => {
    return {
        type: actionTypes.RECEIVE_DATE_CHANGE,
        date
    };
};

export const receiveNewReportFormInput = input => {
    return {
        type: actionTypes.RECEIVE_NEW_REPORT_FORM_INPUT,
        input
    };
};

export const startSubmitReport = () => {
    return {
        type: actionTypes.START_SUBMIT_REPORT
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
        message: "Looks like there was some kind of error. Don't worry, we're looking into it!"
    };
};

export const newReportFormError = errors => {
    return {
        type: actionTypes.NEW_REPORT_FORM_ERROR,
        errors
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