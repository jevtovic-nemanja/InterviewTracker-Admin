import { BASE_URL } from "../constants";
import { actionTypes } from "./actionTypes";
import { startFetchData, fetchDataSuccess, fetchDataFail, deleteReportSuccess, deleteReportFail, submitReportSuccess, submitReportFail, openSubmitModal, goToReportsList } from "./actions";

import { packer } from "../utils/packer";

import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { getDeleteReportId, getDataForSubmission } from "./selectors";


const watchFetchData = function* () {
    yield takeLatest(actionTypes.START_FETCH_DATA, onFetchData);
};

const onFetchData = function* () {
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
    yield takeEvery(actionTypes.START_DELETE_REPORT, onDeleteReport);
};

const onDeleteReport = function* () {
    const id = yield select(getDeleteReportId);
    const url = `${BASE_URL}/reports/${id}`;
    const init = { method: "DELETE" };

    try {
        const response = yield call(fetch, url, init);
        yield put(deleteReportSuccess());
        yield put(startFetchData());
    } catch (e) {
        yield put(deleteReportFail());
        return;
    }
};

const watchSubmitReport = function* () {
    yield takeLatest(actionTypes.START_SUBMIT_REPORT, onSubmitReport);
};

const onSubmitReport = function* () {
    const data = yield select(getDataForSubmission);
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
        yield put(startFetchData());
    } catch (e) {
        yield put(submitReportFail());
        yield put(openSubmitModal());
        return;
    }
};

export default function* rootSaga() {
    yield all([
        watchFetchData(),
        watchDeleteReport(),
        watchSubmitReport()
    ]);
}