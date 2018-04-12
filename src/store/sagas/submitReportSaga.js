import { BASE_URL } from "../../constants";

import {
    call,
    put
} from "redux-saga/effects";

import {
    submitReportSuccess,
    submitReportFail,
    openMessageModal,
    goToReportsList
} from "../actions/actions";

export const submitReportSaga = function* (action) {
    const data = action.formData;
    const url = `${BASE_URL}/reports`;
    const init = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    };

    try {
        const response = yield call(fetch, url, init);
        yield put(submitReportSuccess());
        yield put(goToReportsList());
    } catch (e) {
        yield put(submitReportFail());
        yield put(openMessageModal());
        return;
    }
};