import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Message } from "Components/common/message/message";
import { NextButton } from "Components/common/buttons/next/nextButton";
import Search from "Containers/common/search/search";
import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";

import {
    selectElement,
    enableNextPhase,
    incrementPhase,
    decrementPhase,
    newReportCompany
} from "Store/actions";

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

class SelectCompany extends React.Component {

    getSelectedCompany = (selectedCompanyId) => {
        const selectedCompany = this.props.companies.filter(company => company.companyId === selectedCompanyId).shift();
        return selectedCompany;
    };

    render() {
        const { companies, message, selectedElementId, next } = this.props;
        const { selectElement, newReportCompany, enableNextPhase, decrementPhase, incrementPhase } = this.props;

        const props = {
            selectedElementId,
            selectElement,
            newReportCompany,
            enableNextPhase
        };

        return (
            <div className="row mt-2">

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 mb-3">
                    <div className="row">

                        <div className="col-5 col-md-4 col-lg-3">
                            <button
                                type="button"
                                onClick={() => {
                                    decrementPhase();
                                    location.hash = "#/create-report/";
                                }}
                                className="btn btn-back w-100"
                            >Back</button>
                        </div>

                        <div className="offset-2 col-5 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                            <NextButton next={next} incrementPhase={incrementPhase} newLocation="#/create-report/3" />
                        </div>

                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
                    <Search />
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 mt-2">
                    {
                        companies.length
                            ? companies.map(company => {

                                if (company.message) {
                                    return (
                                        <Message key={company.id} message={company.message} />
                                    );
                                }
                            })

                            : <Message message={message} />
                    }

                    <table className="table table-striped table-bordered table-hover">
                        <tbody>

                            {
                                companies.map(company => {
                                    if (!company.message) {
                                        return (
                                            <CompanyDisplay
                                                key={company.companyId}
                                                company={company}
                                                getSelectedCompany={this.getSelectedCompany}
                                                {...props}
                                            />
                                        );
                                    }
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCompany);