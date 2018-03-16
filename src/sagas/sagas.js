import { BASE_URL } from "../constants";
import { START_FETCH_REPORTS, fetchReportsSuccess, fetchReportsFail } from "../store/actions";

import { all, call, put, takeLatest } from "redux-saga/effects";


function* watchFetchReports() {
    yield takeLatest(START_FETCH_REPORTS, onFetchReports);
}

function* onFetchReports() {
    const url = `${BASE_URL}/reports`;

    try {
        const data = yield call(fetch, url);
        const reports = data.json();
    } catch (e) {
        yield put(fetchReportsFail(e));
        return;
    }

    yield put(fetchReportsSuccess(reports));
}

export default function* rootSaga() {
    yield all([
        watchFetchReports(),
        onFetchReports()
    ]);
}