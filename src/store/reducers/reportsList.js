import { actionTypes } from "Store/actions/actionTypes";

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