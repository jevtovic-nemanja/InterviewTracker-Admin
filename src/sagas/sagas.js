import { BASE_URL } from "../constants";
import { actionTypes } from "../store/actionTypes";
import { fetchReportsSuccess, fetchReportsFail, deleteReportSuccess, deleteReportFail, startFetchReports } from "../store/actions";

import { dataService } from "../services/dataService";

import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { getDeleteReportId } from "./selectors";


function* watchFetchReports() {
    yield takeLatest(actionTypes.START_FETCH_REPORTS, onFetchReports);
}

function* onFetchReports() {
    const url = `${BASE_URL}/reports`;

    try {
        const data = yield call(fetch, url);
        const reports = yield data.json();
        const packedReports = dataService.packReports(reports);
        yield put(fetchReportsSuccess(packedReports));
    } catch (e) {
        yield put(fetchReportsFail());
        return;
    }
}

function* watchDeleteReport() {
    yield takeEvery(actionTypes.START_DELETE_REPORT, onDeleteReport);
}

function* onDeleteReport() {
    const id = yield select(getDeleteReportId);
    const url = `${BASE_URL}/reports/${id}`;
    const init = { method: "DELETE" };

    try {
        const response = yield call(fetch, url, init);
        yield put(deleteReportSuccess());
        yield put(startFetchReports());
    } catch (e) {
        yield put(deleteReportFail());
        return;
    }
}

export default function* rootSaga() {
    yield all([
        watchFetchReports(),
        watchDeleteReport()
    ]);
}