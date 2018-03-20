import React from "react";

import { Switch, Route } from "react-router-dom";

import AsideComponent from "./asideContainer";

export const CreateReportPage = () => {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="offset-1 col-10 offset-sm-0 col-sm-12 card mb-4">
                    <div className="row card-body">

                        <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                            <AsideComponent />
                        </aside>

                        {/* <main className="col-12 col-md-8 col-xl-9">
                            <Switch>
                                <Route path="/" component={ReportsListPage} />
                                <Route path="/" component={CreateReportPage} />
                                <Route path="/" component={CreateReportPage} />
                            </Switch>

                            <div className="col-12 mt-4">
                                <h5 className="text-center">{error}</h5>
                            </div>

                        </main> */}

                    </div>
                </div>
            </div>
        </div>
    );
};