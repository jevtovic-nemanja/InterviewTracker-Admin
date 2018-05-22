import moment from "moment";

import Report from "Entities/report";
import Candidate from "Entities/candidate";
import Company from "Entities/company";

export const packer = (responseType, responseData) => {
    
    const packMethods = {
        "reports": data => {
            const reports = data.reverse().map(item => {
                const { id, candidateId, candidateName, companyId, companyName, interviewDate, phase, status, note } = item;
                const date = moment(interviewDate).format("DD.MM.YYYY");
                const reportObj = new Report(id, candidateId, candidateName, companyId, companyName, date, phase, status, note);
                return reportObj;
            });
            return reports;
        },

        "candidates": data => {
            const candidates = data.map(item => {
                const { id, name, email, avatar } = item;
                const candidateObj = new Candidate(id, name, email, avatar);
                return candidateObj;
            });
            return candidates;
        },

        "companies": data => {
            const companies = data.map(item => {
                const { id, name } = item;
                const companyObj = new Company(id, name);
                return companyObj;
            });
            return companies;
        }
    };

    return packMethods[responseType](responseData);
};