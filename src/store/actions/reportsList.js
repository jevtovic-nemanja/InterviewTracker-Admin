import { actionTypes } from "./actionTypes";

import { Messages } from "Src/constants";

export const startFetchData = () => {
    return {
        type: actionTypes.START_FETCH_DATA,
        message: Messages.LOADING
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
        message: Messages.ERROR
    };
};

export const startDeleteReport = id => {
    return {
        type: actionTypes.START_DELETE_REPORT,
        message: Messages.LOADING,
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
        message: Messages.ERROR
    };
};