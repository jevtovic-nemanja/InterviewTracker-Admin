import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "Containers/common/header/header";
import ReportsList from "Containers/reports-list/reportsList";

import { Routes } from "./constants";

import "./globals.css";

import { asyncComponent } from "./hocs/asyncComponent/asyncComponent";

const asyncCreateReportPage = asyncComponent(() => {
    return import(/* webpackChunkName: "createReport" */ "./components/create-report/createReport/createReport");
});

class App extends React.Component {
    render() {
        return (
            <>
                <Header hash={location.hash} />
                <Switch>
                    <Route exact path={Routes.REPORTS_LIST} component={ReportsList} />
                    <Route path={Routes.CREATE_REPORT_CANDIDATES} component={asyncCreateReportPage} />
                </Switch>
            </>
        );
    }
}

export default App;