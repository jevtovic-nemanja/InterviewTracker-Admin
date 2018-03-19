import { BASE_URL } from "../constants";
import { actionTypes } from "../store/actionTypes";
import { fetchReportsSuccess, fetchReportsFail, noFilterResults } from "../store/actions";

import { dataService } from "../services/dataService";

import { all, call, put, takeLatest } from "redux-saga/effects";


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
        yield put(fetchReportsFail(e));
        return;
    }
}

function* watchNoFilterResults() {
    yield takeLatest(actionTypes.NO_FILTER_RESULTS, onNoFilterResults);
}

function* onNoFilterResults() {
    yield put(noFilterResults());
}

export default function* rootSaga() {
    yield all([
        watchFetchReports(),
        onFetchReports(),
        onNoFilterResults()
    ]);
}