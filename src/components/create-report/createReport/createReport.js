import React from "react";

import { Switch, Route } from "react-router-dom";

import Aside from "Containers/create-report/wizard/aside/aside";
import Candidates from "Containers/create-report/wizard/candidates/candidates";

import { Routes } from "Src/constants";

import { asyncComponent } from "Hocs/asyncComponent";

const asyncCompanies = asyncComponent(() => {
    return import(/* webpackChunkName: "companies" */ "Containers/create-report/wizard/companies/companies");
});

const asyncNewReport = asyncComponent(() => {
    return import(/* webpackChunkName: "newReport" */ "Containers/create-report/wizard/newReport/newReport");
});

class CreateReportPage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-12 card mb-4">
                        <div className="row card-body">

                            <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                                <Aside />
                            </aside>

                            <main className="col-12 col-md-8 col-xl-9">
                                <Switch>
                                    <Route exact path={Routes.CREATE_REPORT_CANDIDATES} component={Candidates} />
                                    <Route path={Routes.CREATE_REPORT_COMPANIES} component={asyncCompanies} />
                                    <Route path={Routes.CREATE_REPORT_FORM} component={asyncNewReport} />
                                </Switch>
                            </main>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateReportPage;