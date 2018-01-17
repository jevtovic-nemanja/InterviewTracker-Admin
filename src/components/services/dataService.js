import moment from "moment";

import { BASE_URL } from "../../constants";
import { commService } from "./communicationService";
import Report from "../entities/report";
import Candidate from "../entities/candidate";

class DataService {
    constructor() { }

    deleteReport(id, callback, errorCallback) {
        const url = `${BASE_URL}/reports/${id}`;
        commService.deleteData(url, response => callback(response), error => errorCallback(error));
    }

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

    getCandidates(callback, errorCallback) {
        const url = `${BASE_URL}/candidates`;
        commService.getData(url, data => callback(this.packCandidates(data)), error => errorCallback(error));
    }

    packCandidates(data) {
        let candidates = data.map(item => {
            const { id, name, email, avatar} = item;
            const candidateObj = new Candidate(id, name, email, date, avatar, status, note);
            return candidateObj;
        });
        return candidates;
    }
}

export const dataService = new DataService();