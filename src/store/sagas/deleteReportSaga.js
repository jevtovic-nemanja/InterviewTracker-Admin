import { BASE_URL } from "Src/constants";

import {
    call,
    put
} from "redux-saga/effects";

import {
    startFetchData,
    deleteReportSuccess,
    deleteReportFail,
    openMessageModal
} from "Store/actions";

export const deleteReportSaga = function* (action) {
    const id = action.id;
    const url = `${BASE_URL}/reports/${id}`;
    const init = { method: "DELETE" };

    try {
        const response = yield call(fetch, url, init);
        yield put(deleteReportSuccess());
        yield put(startFetchData());
    } catch (e) {
        yield put(deleteReportFail());
        yield put(openMessageModal());
        return;
    }
};