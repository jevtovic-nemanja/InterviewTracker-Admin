import React from "react";

import { dataService } from "../services/dataService";

import { Aside } from "../create-report/wizard/aside";
import { SelectCandidate } from "../create-report/wizard/candidates";
import { SelectCompany } from "../create-report/wizard/companies";
import FillReport from "../create-report/wizard/fill-report";

class CreateReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {
            allCandidates: [],
            filteredCandidates: [],
            allCompanies: [],
            filteredCompanies: [],
            error: ""
        };
    }

    bindEventHandlers() {
        this.filterCandidates = this.filterCandidates.bind(this);
        this.filterCompanies = this.filterCompanies.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        dataService.getCandidates(candidates => this.setState({
            allCandidates: candidates,
            filteredCandidates: candidates
        }), error => this.handleError(error));

        dataService.getCompanies(companies => this.setState({
            allCompanies: companies,
            filteredCompanies: companies
        }), error => this.handleError(error));
    }

    handleError(error) {
        this.setState({ error: "Looks like there was some kind of error. Don't worry, we're looking into it!" });
    }

    filter(searchThrough, searchItem) {
        const filtered = searchThrough.filter(item => {
            return item.name.toLowerCase().includes(searchItem);
        });
        return filtered;
    }

    filterCandidates(searchItem) {
        const filteredCandidates = this.filter(this.state.allCandidates, searchItem);

        filteredCandidates.length
            ? this.setState({
                filteredCandidates: filteredCandidates,
                error: ""
            })
            : this.setState({
                filteredCandidates: [],
                error: "No candidates match the search criteria."
            });
    }

    filterCompanies(searchItem) {
        const filteredCompanies = this.filter(this.state.allCompanies, searchItem);

        filteredCompanies.length
            ? this.setState({
                filteredCompanies: filteredCompanies,
                error: ""
            })
            : this.setState({
                filteredCompanies: [],
                error: "No companies match the search criteria."
            });
    }

    

    render() {
        const { filteredCandidates, filteredCompanies, error } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-12 card">
                        <div className="row card-body">
                            <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                                <Aside />
                            </aside>
                            <main className="col-12 col-md-8 col-xl-9">
                                {/* <SelectCandidate candidates={filteredCandidates} onSearch={this.filterCandidates} />
                                <SelectCompany companies={filteredCompanies} onSearch={this.filterCompanies} /> */}
                                <FillReport />
                                <div className="col-12 mt-4">
                                    <h5 className="text-center">{error}</h5>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateReportPage;