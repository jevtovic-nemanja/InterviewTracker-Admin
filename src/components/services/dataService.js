import moment from "moment";

import { BASE_URL } from "../../constants";
import { commService } from "./communicationService";
import Report from "../entities/report";

class DataService {
    constructor() { }

    getReports(callback, errorCallback) {
        const url = `${BASE_URL}/reports`;
        commService.getData(url, data => callback(this.packReports(data)), error => errorCallback(error));
    }

    packReports(data) {
        let reports = data.map(item => {
            const { id, candidateName, companyName, interviewDate, phase, status, note } = item;
            const date = moment(interviewDate).format("DD.MM.YYYY");
            const reportObj = new Report(id, candidateName, companyName, date, phase, status, note);
            return reportObj;
        });
        return reports;
    }

    deleteReport(id, callback, errorCallback) {
        const url = `${BASE_URL}/reports/${id}`;
        commService.deleteData(url, response => callback(response), error => errorCallback(error));
    }
}

export const dataService = new DataService();