import { combineReducers } from "redux";

import {
    message,
    messageModal,
    searchItem
} from "./common";

import { data } from "./reportsList";

import {
    createReportPhase,
    selectedElementId,
    enableNextPhase,
    newReportData
} from "./createReport";

export const rootReducer = combineReducers({
    message,
    messageModal,
    searchItem,
    data,
    createReportPhase,
    selectedElementId,
    enableNextPhase,
    newReportData
});