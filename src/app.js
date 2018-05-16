import React from "react";

import { hot } from "react-hot-loader";

import { Switch, Route } from "react-router-dom";

import Header from "Containers/common/header/header";
import ReportsListPage from "Containers/reports-list/reportsListPage";

import "./assets/css/main.css";

import { asyncComponent } from "./hocs/asyncComponent";

const asyncCreateReportPage = asyncComponent(() => {
    return import(/* webpackChunkName: "createReport" */ "./components/create-report/createReport");
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w-100">
                <Header hash={location.hash} />
                <Switch>
                    <Route exact path="/" component={ReportsListPage} />
                    <Route path="/create-report/" component={asyncCreateReportPage} />
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);