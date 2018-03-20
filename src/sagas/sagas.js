import { BASE_URL } from "../constants";
import { actionTypes } from "../store/actionTypes";
import { fetchReportsSuccess, fetchReportsFail, deleteReportSuccess, deleteReportFail, startFetchReports, fetchCandidatesSuccess, fetchCandidatesFail, fetchCompaniesSuccess, fetchCompaniesFail } from "../store/actions";

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

function* watchFetchCandidates() {
    yield takeLatest(actionTypes.START_FETCH_CANDIDATES, onFetchCandidates);
}

function* onFetchCandidates() {
    const url = `${BASE_URL}/candidates`;

    try {
        const data = yield call(fetch, url);
        const candidates = yield data.json();
        const packedCandidates = dataService.packCandidates(candidates);
        yield put(fetchCandidatesSuccess(packedCandidates));
    } catch (e) {
        yield put(fetchCandidatesFail());
        return;
    }
}

function* watchFetchCompanies() {
    yield takeLatest(actionTypes.START_FETCH_COMPANIES, onFetchCompanies);
}

function* onFetchCompanies() {
    const url = `${BASE_URL}/companies`;

    try {
        const data = yield call(fetch, url);
        const companies = yield data.json();
        const packedCompanies = dataService.packCompanies(companies);
        yield put(fetchCompaniesSuccess(packedCompanies));
    } catch (e) {
        yield put(fetchCompaniesFail());
        return;
    }
}

export default function* rootSaga() {
    yield all([
        watchFetchReports(),
        watchDeleteReport(),
        watchFetchCandidates(),
        watchFetchCompanies()
    ]);
}