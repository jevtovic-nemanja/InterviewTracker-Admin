import React from "react";

import Search from "Containers/common/search/search";

class SelectCompany extends React.Component {

    getSelectedCompany = (companies, selectedCompanyId) => {
        const selectedCompany = companies.filter(company => company.companyId === selectedCompanyId).shift();
        return selectedCompany;
    };

    render() {
        const { companies, message, selectedElementId, next, selectElement, newReportCompany, enableNextPhase, decrementPhase, incrementPhase } = this.props;

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
                            <button
                                type="button"
                                disabled={next}
                                onClick={() => {
                                    incrementPhase();
                                    location.hash = "#/create-report/3";
                                }}
                                className={`${next} btn btn-next w-100`}
                            >Next</button>
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
                                        <div className="col-12 mt-4" key={company.id}>
                                            <h5 className="text-center">{company.message}</h5>
                                        </div>
                                    );
                                }
                            })

                            : <div className="col-12 mt-4">
                                <h5 className="text-center">{message}</h5>
                            </div>
                    }

                    <table className="table table-striped table-bordered table-hover">
                        <tbody>

                            {
                                companies.map(company => {
                                    const { companyId, name } = company;
                                    const selected = selectedElementId === companyId ? "selected" : "";

                                    if (!company.message) {
                                        return (
                                            <tr
                                                key={companyId}
                                                id={companyId}
                                                onClick={() => {
                                                    selectElement(companyId);
                                                    newReportCompany(this.getSelectedCompany(companies, companyId));
                                                    enableNextPhase();
                                                }}
                                            >
                                                <td className={`${selected}`}>{name}</td>
                                            </tr>
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

export default SelectCompany;