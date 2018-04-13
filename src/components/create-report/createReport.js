import React from "react";

import { Switch, Route } from "react-router-dom";

import Aside from "Containers/create-report/wizard/aside/aside";
import Candidates from "Containers/create-report/wizard/candidates/candidates";
import Companies from "Containers/create-report/wizard/companies/companies";
import NewReport from "Containers/create-report/wizard/newReport/newReport";

export const CreateReportPage = () => {
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
                                <Route exact path="/create-report/" component={Candidates} />
                                <Route path="/create-report/2" component={Companies} />
                                <Route path="/create-report/3" component={NewReport} />
                            </Switch>
                        </main>

                    </div>
                </div>
            </div>
        </div>
    );
};