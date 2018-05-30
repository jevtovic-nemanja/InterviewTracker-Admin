import { API_URLS } from "Src/constants";

import {
    call,
    put
} from "redux-saga/effects";

import {
    fetchDataSuccess,
    fetchDataFail,
} from "Store/actions";

import { packer } from "Utils/packer";

export const fetchDataSaga = function* (action) {
    const urls = {
        reports: API_URLS.REPORTS,
        candidates: API_URLS.CANDIDATES,
        companies: API_URLS.COMPANIES
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