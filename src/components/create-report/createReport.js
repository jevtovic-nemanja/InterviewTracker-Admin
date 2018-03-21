import React from "react";

import { Switch, Route } from "react-router-dom";

import AsideComponent from "../../containers/asideContainer";
import Candidates from "../../containers/candidatesContainer";
import Companies from "../../containers/companiesContainer";
import NewReportForm from "../../containers/newReport";

export const CreateReportPage = ({ match }) => {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="offset-1 col-10 offset-sm-0 col-sm-12 card mb-4">
                    <div className="row card-body">

                        <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                            <AsideComponent />
                        </aside>

                        <main className="col-12 col-md-8 col-xl-9">
                            <Switch>
                                <Route exact path="/create-report/" component={Candidates} />
                                <Route path="/create-report/2" component={Companies} />
                                <Route path="/create-report/3" component={NewReportForm} />
                            </Switch>
                        </main>

                    </div>
                </div>
            </div>
        </div>
    );
};