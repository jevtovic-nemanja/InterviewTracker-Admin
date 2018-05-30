import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Message } from "Components/common/message/message";
import { NextButton } from "Components/common/buttons/next/nextButton";
import { BackButton } from "Components/common/buttons/back/backButton";
import Search from "Containers/common/search/search";
import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";

import {
    selectElement,
    enableNextPhase,
    incrementPhase,
    decrementPhase,
    newReportCompany
} from "Store/actions";

import { Messages, Routes } from "Src/constants";

const filterCompanies = (companies, searchItem) => {
    if (companies.length) {
        const filteredCompanies = companies.filter(company => company.name.toLowerCase().includes(searchItem));
        return filteredCompanies.length
            ? filteredCompanies
            : [{
                id: Messages.NO_RESULTS,
                message: Messages.NO_COMPANIES
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
    searchRef = React.createRef();

    componentDidMount() {
        this.searchRef.current.getWrappedInstance().focus();
    }

    render() {
        const { companies, message, selectedElementId, next } = this.props;
        const { selectElement, newReportCompany, enableNextPhase, decrementPhase, incrementPhase } = this.props;

        return (
            <div className="row mt-2">

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 mb-3">
                    <div className="row">

                        <div className="col-5 col-md-4 col-lg-3">
                            <BackButton decrementPhase={decrementPhase} newLocation={Routes.CREATE_REPORT_CANDIDATES} />
                        </div>

                        <div className="offset-2 col-5 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                            <NextButton next={next} incrementPhase={incrementPhase} newLocation={Routes.CREATE_REPORT_FORM} />
                        </div>

                    </div>
                </div>

                <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
                    <Search ref={this.searchRef} />
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
                                                selected={selectedElementId}
                                                handleClick={() => {
                                                    selectElement(company.companyId);
                                                    newReportCompany(company);
                                                    enableNextPhase();
                                                }}
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