import { BASE_URL } from "../../constants";
import { actionTypes } from "../actions/actionTypes";

import {
    startFetchData,
    fetchDataSuccess,
    fetchDataFail,
    deleteReportSuccess,
    deleteReportFail,
    submitReportSuccess,
    submitReportFail,
    openMessageModal,
    goToReportsList
} from "../actions/actions";

import { packer } from "../../utils/packer";

import { all, call, put, select, takeLatest } from "redux-saga/effects";

const watchFetchData = function* () {
    yield takeLatest(actionTypes.START_FETCH_DATA, onFetchData);
};

const onFetchData = function* (action) {
    const urls = {
        reports: `${BASE_URL}/reports`,
        candidates: `${BASE_URL}/candidates`,
        companies: `${BASE_URL}/companies`
    };

    const allData = {};

    for (const prop in urls) {
        try {
            const data = yield call(fetch, urls[prop]);
            const parsedData = yield data.json();
            const packedData = packer(prop, parsedData);
            allData[prop] = packedData;
        } catch (e) {
            yield put(fetchDataFail());
            return;
        }
    }

    yield put(fetchDataSuccess(allData));
};

const watchDeleteReport = function* () {
    yield takeLatest(actionTypes.START_DELETE_REPORT, onDeleteReport);
};

const onDeleteReport = function* (action) {
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

const watchSubmitReport = function* () {
    yield takeLatest(actionTypes.START_SUBMIT_REPORT, onSubmitReport);
};

const onSubmitReport = function* (action) {
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

export const rootSaga = function* () {
    yield all([
        watchFetchData(),
        watchDeleteReport(),
        watchSubmitReport()
    ]);
};