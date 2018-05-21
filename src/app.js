import React from "react";

import { hot } from "react-hot-loader";

import { Switch, Route } from "react-router-dom";

import Header from "Containers/common/header/header";
import ReportsList from "Containers/reports-list/reportsList";

import "./assets/css/main.css";

import { asyncComponent } from "./hocs/asyncComponent";

const asyncCreateReportPage = asyncComponent(() => {
    return import(/* webpackChunkName: "createReport" */ "./components/create-report/createReport/createReport");
});

class App extends React.Component {
    render() {
        return (
            <div className="w-100">
                <Header hash={location.hash} />
                <Switch>
                    <Route exact path="/" component={ReportsList} />
                    <Route path="/create-report/" component={asyncCreateReportPage} />
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);