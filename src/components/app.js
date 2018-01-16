import React from "react";

import { Switch, Route } from "react-router-dom";

import { Header } from "./common/header";
import ReportsListPage from "./reports-list/reportsListPage";
import CreateReportPage from "./create-report/createReportPage";

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
                    <Route path="/create-report" component={CreateReportPage} />
                </Switch>
            </div>
        );
    }
}

export default App;