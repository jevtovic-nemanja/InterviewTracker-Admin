import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SelectCompany from "Components/create-report/wizard/selectCompany/selectCompany";

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

const mapStateToProps = state => ({
    companies: filterCompanies(state.data.companies, state.searchItem),
    message: state.message,
    selectedElementId: state.selectedElementId,
    next: state.enableNextPhase
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectElement,
    enableNextPhase,
    incrementPhase,
    decrementPhase,
    newReportCompany
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompany);