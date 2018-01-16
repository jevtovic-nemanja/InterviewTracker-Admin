import React from "react";

import { BASE_URL } from "../../constants";
import { dataService } from "../services/dataService";


class ReportsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            reports: [],
            error: ""
        };
    }

    bindEventHandlers() {

    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        dataService.getReports(reports => this.setState({ reports: reports }), error => this.handleError(error));
    }

    handleError(error) {
        error === "networkError"
            ? this.setState({ error: "Looks like the server is not responding. Don't worry, we're looking into it!" })
            : this.setState({ error: "Looks like there was some kind of error. Don't worry, we're looking into it!" });
    }

    render() {
        const { reports, error } = this.state;

        return (
            <div className="container">

            </div>
        );
    }
}

export default ReportsListPage;