import { ApiUrls, Routes } from "Src/constants";

import {
    call,
    put
} from "redux-saga/effects";

import {
    submitReportSuccess,
    submitReportFail,
    openMessageModal,
    goToReportsList
} from "Store/actions";

export const submitReportSaga = function* (action) {
    const data = action.formData;
    const url = ApiUrls.REPORTS;
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
        location.hash = `#${Routes.REPORTS_LIST}`;
    } catch (e) {
        yield put(submitReportFail());
        yield put(openMessageModal());
    }
};
