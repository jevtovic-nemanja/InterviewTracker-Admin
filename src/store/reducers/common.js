import { actionTypes } from "Store/actions/actionTypes";

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

export const searchItem = (state = "", action) => {
    switch (action.type) {
    case actionTypes.RECEIVE_INPUT_CHANGE:
        return action.inputItem;
    default:
        return state;
    }
};