import { BASE_URL } from "Src/constants";

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