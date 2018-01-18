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
            phase: 1,
            next: "disabled",
            selectedElement: "",
            report: {
                candidateId: "",
                candidateName: "",
                companyId: "",
                companyName: ""
            },
            error: ""
        };
    }

    bindEventHandlers() {
        this.filterCandidates = this.filterCandidates.bind(this);
        this.filterCompanies = this.filterCompanies.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSelect(type, element) {
        if (element.id) {
            this.implementSelect(type, element);
        } else {
            this.checkParentForId(type, element);
        }
    }

    checkParentForId(type, element) {
        const parent = element.parentElement;
        const id = parent.id;

        if (id) {
            this.implementSelect(type, parent);
        } else {
            this.checkParentForId(type, parent);
        }
    }

    implementSelect(type, element) {
        const { selectedElement } = this.state;

        if (selectedElement) {
            selectedElement.firstChild.classList.remove("selected");
        }

        this.setState(prevState => {
            prevState.next = "";
            prevState.selectedElement = element;
            prevState.report[type] = parseInt(element.id);
            return prevState;
        });

        this.getName(type, element.id);
    }

    getName(type, id) {
        const { allCandidates, allCompanies } = this.state;

        if (type === "candidateId") {
            const selected = allCandidates.filter(candidate => candidate.candidateId === parseInt(id))[0];
            
            this.setState(prevState => {
                prevState.report.candidateName = selected.name;
            });

        } else {
            const selected = allCompanies.filter(company => company.companyId === parseInt(id))[0];

            this.setState(prevState => {
                prevState.report.companyName = selected.name;
            });
        }
    }

    onBack() {
        this.setState(prevState => {
            prevState.phase = prevState.phase - 1;
            prevState.next = "disabled";
            return prevState;
        });
    }

    onNext() {
        const { phase, selectedElement } = this.state;
        selectedElement.firstChild.classList.remove("selected");

        const next = phase === 2 ? "d-none" : "disabled";

        this.setState(prevState => {
            prevState.next = next;
            prevState.phase = prevState.phase + 1;
            prevState.selectedElement = "";
            return prevState;
        });
    }

    onSubmit(input) {
        const data = this.state.report;
        Object.assign(data, input);

        dataService.postReport(data, response => location.assign("#/"), error => this.handleError);
    }

    render() {
        const { filteredCandidates, filteredCompanies, phase, next, selectedElement, report, error } = this.state;

        if (selectedElement) {
            selectedElement.firstChild.classList.add("selected");
        }

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-12 card mb-4">
                        <div className="row card-body">

                            <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                                <Aside
                                    phase={phase}
                                    next={next}
                                    info={report}
                                    onBack={this.onBack}
                                    onNext={this.onNext}
                                />
                            </aside>

                            <main className="col-12 col-md-8 col-xl-9">
                                <SelectCandidate
                                    phase={phase}
                                    candidates={filteredCandidates}
                                    onSearch={this.filterCandidates}
                                    onSelect={this.onSelect}
                                />
                                <SelectCompany
                                    phase={phase}
                                    companies={filteredCompanies}
                                    onSearch={this.filterCompanies}
                                    onSelect={this.onSelect}
                                />
                                <FillReport
                                    phase={phase}
                                    onSubmit={this.onSubmit}
                                />
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