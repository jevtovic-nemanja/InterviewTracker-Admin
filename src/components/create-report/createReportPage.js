import React from "react";

import { dataService } from "../services/dataService";

import { Aside } from "../create-report/wizard/aside";
import { SelectCandidate } from "../create-report/wizard/candidates";
import { SelectCompany } from "../create-report/wizard/companies";
import { FillReport } from "../create-report/wizard/fill-report";

class CreateReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            candidates: [],
            filteredCandidates: [],
            companies: [],
            filteredCompanies: [],
            error: ""
        };
    }

    bindEventHandlers() {

    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        dataService.getCandidates(candidates => this.setState({
            candidates: candidates,
            filteredCandidates: candidates
        }), error => this.handleError(error));

        dataService.getCompanies(companies => this.setState({
            companies: companies,
            filteredCompanies: companies
        }), error => this.handleError(error));
    }

    handleError(error) {
        this.setState({ error: "Looks like there was some kind of error. Don't worry, we're looking into it!" });
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <aside className="col-4">
                        <Aside />
                    </aside>
                    <main className="col-8">
                        <SelectCandidate />
                        <SelectCompany />
                        <FillReport />
                    </main>
                </div>
            </div>
        );
    }
}

export default CreateReportPage;