import { actionTypes } from "../actions/actionTypes";

import { fetchDataSaga } from "./fetchDataSaga";
import { deleteReportSaga } from "./deleteReportSaga";
import { submitReportSaga } from "./submitReportSaga";

import { takeLatest } from "redux-saga/effects";

export const rootSaga = function* () {
    yield takeLatest(actionTypes.START_FETCH_DATA, fetchDataSaga);
    yield takeLatest(actionTypes.START_DELETE_REPORT, deleteReportSaga);
    yield takeLatest(actionTypes.START_SUBMIT_REPORT, submitReportSaga);
};