import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "./containers/headerContainer";
import ReportsListPage from "./containers/reportsListPage";
import { CreateReportPage } from "./components/create-report/createReport";

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

export default App;