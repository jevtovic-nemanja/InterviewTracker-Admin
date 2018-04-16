import React from "react";

import { hot } from "react-hot-loader";

import { Switch, Route } from "react-router-dom";

import Header from "Containers/common/header";
import ReportsListPage from "Containers/reports-list/reportsListPage";
import { CreateReportPage } from "Components/create-report/createReport";

import "./assets/css/main.css";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w-100">
                <Header />
                <Switch>
                    <Route exact path="/" component={ReportsListPage} />
                    <Route path="/create-report/" component={CreateReportPage} />
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);