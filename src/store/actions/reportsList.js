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