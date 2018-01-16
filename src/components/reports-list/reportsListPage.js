import React from "react";

import { BASE_URL } from "../../constants";
import { dataService } from "../services/dataService";

import Search from "../common/search";
import { ReportDisplay } from "./reportDisplay";

class ReportsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            allReports: [],
            filteredReports: [],
            error: ""
        };
    }

    bindEventHandlers() {
        this.filterReports = this.filterReports.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        dataService.getReports(reports => this.setState({
            allReports: reports,
            filteredReports: reports
        }), error => this.handleError(error));
    }

    handleError(error) {
        error === "networkError"
            ? this.setState({ error: "Looks like the server is not responding. Don't worry, we're looking into it!" })
            : this.setState({ error: "Looks like there was some kind of error. Don't worry, we're looking into it!" });
    }

    filterReports(searchItem) {

    }

    render() {
        const { allReports, filteredReports, error } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <Search onSearch={this.filterReports} />
                    {filteredReports.map(report => <ReportDisplay key={report.id} report={report} />)}
                </div>
            </div>
        );
    }
}

export default ReportsListPage;