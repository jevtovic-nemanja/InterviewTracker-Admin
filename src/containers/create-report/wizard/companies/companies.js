import React from "react";

import { connect } from "react-redux";

import { SelectCompany } from "Components/create-report/wizard/selectCompany/selectCompany";

import {
    selectElement,
    enableNextPhase,
    incrementPhase,
    decrementPhase,
    newReportCompany
} from "Store/actions/index";

const filterCompanies = (companies, searchItem) => {
    if (companies.length) {
        const filteredCompanies = companies.filter(company => company.name.toLowerCase().includes(searchItem));
        return filteredCompanies.length
            ? filteredCompanies
            : [{
                id: "NO_RESULTS",
                message: "No companies match the search criteria."
            }];
    } else return [];
};

const getSelectedCompany = (companies, selectedCompanyId) => {
    const selectedCompany = companies.filter(company => company.companyId === selectedCompanyId).shift();
    return selectedCompany;
};

const mapStateToProps = state => ({
    companies: filterCompanies(state.data.companies, state.searchItem),
    message: state.message,
    selectedElementId: state.selectedElementId,
    next: state.enableNextPhase
});

const mapDispatchToProps = dispatch => ({
    onSelect: (companies, id) => {
        dispatch(selectElement(id));
        dispatch(newReportCompany(getSelectedCompany(companies, id)));
        dispatch(enableNextPhase());
    },
    onBack: () => {
        dispatch(decrementPhase());
        location.hash = "#/create-report/";
    },
    onNext: () => {
        dispatch(incrementPhase());
        location.hash = "#/create-report/3";
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompany);