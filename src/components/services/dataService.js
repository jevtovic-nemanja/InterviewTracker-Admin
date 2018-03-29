import moment from "moment";

import { BASE_URL } from "../../constants";
import { commService } from "./communicationService";

import Report from "../entities/report";
import Candidate from "../entities/candidate";
import Company from "../entities/company";

class DataService {
    constructor() { }

    getReports = (callback, errorCallback) => {
        const url = `${BASE_URL}/reports`;
        commService.getData(url, data => callback(this.packReports(data)), error => errorCallback(error));
    }

    packReports = data => {
        let reports = data.reverse().map(item => {
            const { id, candidateName, companyName, interviewDate, phase, status, note } = item;
            const date = moment(interviewDate).format("DD.MM.YYYY");
            const reportObj = new Report(id, candidateName, companyName, date, phase, status, note);
            return reportObj;
        });
        return reports;
    }

    getCandidates = (callback, errorCallback) => {
        const url = `${BASE_URL}/candidates`;
        commService.getData(url, data => callback(this.packCandidates(data)), error => errorCallback(error));
    }

    packCandidates = data => {
        let candidates = data.map(item => {
            const { id, name, email, avatar } = item;
            const candidateObj = new Candidate(id, name, email, avatar);
            return candidateObj;
        });
        return candidates;
    }

    getCompanies = (callback, errorCallback) => {
        const url = `${BASE_URL}/companies`;
        commService.getData(url, data => callback(this.packCompanies(data)), error => errorCallback(error));
    }

    packCompanies = data => {
        let companies = data.map(item => {
            const { id, name } = item;
            const companyObj = new Company(id, name);
            return companyObj;
        });
        return companies;
    }

    postReport = (data, callback, errorCallback) => {
        const url = `${BASE_URL}/reports`;
        commService.postData(url, data, response => callback(response), error => errorCallback(error));
    }

    deleteReport = (id, callback, errorCallback) => {
        const url = `${BASE_URL}/reports/${id}`;
        commService.deleteData(url, response => callback(response), error => errorCallback(error));
    }

    getCandidatesReports = (id, callback, errorCallback) => {
        const url = `${BASE_URL}/reports?q=${id}`;
        commService.getData(url, response => callback(response), error => errorCallback(error));
    }
}

export const dataService = new DataService();