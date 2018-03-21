import moment from "moment";

import Report from "../entities/report";
import Candidate from "../entities/candidate";
import Company from "../entities/company";

export const packer = (type, data) => {
    switch (type) {
    case "reports":
        return packReports(data);
    case "candidates":
        return packCandidates(data);
    case "companies":
        return packCompanies(data);
    }
};

const packReports = data => {
    let reports = data.reverse().map(item => {
        const { id, candidateId, candidateName, companyId, companyName, interviewDate, phase, status, note } = item;
        const date = moment(interviewDate).format("DD.MM.YYYY");
        const reportObj = new Report(id, candidateId, candidateName, companyId, companyName, date, phase, status, note);
        return reportObj;
    });
    return reports;
};


const packCandidates = data => {
    let candidates = data.map(item => {
        const { id, name, email, avatar } = item;
        const candidateObj = new Candidate(id, name, email, avatar);
        return candidateObj;
    });
    return candidates;
};


const packCompanies = data => {
    let companies = data.map(item => {
        const { id, name } = item;
        const companyObj = new Company(id, name);
        return companyObj;
    });
    return companies;
};