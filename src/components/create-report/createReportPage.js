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
            selectedElementId: "",
            report: {
                candidateId: "",
                candidateName: "",
                companyId: "",
                companyName: ""
            },
            candidateReports: [],
            trackedData: {
                currentPhase: "",
                currentStatus: "",
                timeOfLastInterview: null,
                hiringStatus: ""
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

    filter(data, searchItem, assignTo, errorMessage) {
        const filteredItems = data.filter(item => {
            return item.name.toLowerCase().includes(searchItem);
        });

        filteredItems.length
            ? this.setState(prevState => {
                prevState[assignTo] = filteredItems;
                prevState.error = "";
                return prevState;
            })
            : this.setState(prevState => {
                prevState[assignTo] = [];
                prevState.error = errorMessage;
                return prevState;
            });
    }

    filterCandidates(searchItem) {
        this.filter(this.state.allCandidates, searchItem, "filteredCandidates", "No candidates match the search criteria.");
    }

    filterCompanies(searchItem) {
        this.filter(this.state.allCompanies, searchItem, "filteredCompanies", "No companies match the search criteria.");
    }

    onSelect(idType, id) {
        this.setState(prevState => {
            prevState.next = "";
            prevState.selectedElementId = id;
            prevState.report[idType] = parseInt(id);
            return prevState;
        });

        this.getName(idType, id);
    }

    getName(idType, id) {
        const { allCandidates, allCompanies } = this.state;

        if (idType === "candidateId") {
            const selected = allCandidates.filter(candidate => candidate.candidateId === parseInt(id)).shift();

            this.setState(prevState => {
                prevState.report.candidateName = selected.name;
            });

        } else {
            const selected = allCompanies.filter(company => company.companyId === parseInt(id)).shift();

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
        const { phase } = this.state;

        const next = phase === 2 ? "d-none" : "disabled";

        if (phase === 1) {
            this.getCandidateReports();
        }

        if (phase === 2) {
            this.getTrackedData();
        }

        this.setState(prevState => {
            prevState.next = next;
            prevState.phase = prevState.phase + 1;
            prevState.selectedElementId = "";
            prevState.filteredCandidates = prevState.allCandidates;
            prevState.filteredCompanies = prevState.allCompanies;
            return prevState;
        });
    }

    onSubmit(input) {
        const data = this.state.report;
        Object.assign(data, input);

        dataService.postReport(data, response => location.assign("#/"), error => this.handleError);
    }

    getCandidateReports() {
        const { candidateId } = this.state.report;

        dataService.getCandidatesReports(candidateId, reports => this.setState({ candidateReports: reports }),
            error => this.handleError(error));
    }

    getTrackedData() {
        const { candidateReports } = this.state;
        const { companyId } = this.state.report;

        const candidateWithCompany = candidateReports.filter(report => report.companyId === companyId);

        if (candidateWithCompany.length) {
            const phases = candidateWithCompany.map(report => report.phase);

            let currentPhase = "";

            if (phases.includes("final")) {
                currentPhase = "final";
            } else if (phases.includes("tech")) {
                currentPhase = "tech";
            } else if (phases.includes("hr")) {
                currentPhase = "hr";
            } else if (phases.includes("cv")) {
                currentPhase = "cv";
            } else currentPhase = "none";

            const currentReport = candidateWithCompany.filter(report => report.phase === currentPhase).shift();

            const currentStatus = currentReport.status;
            const timeOfLastInterview = currentReport.interviewDate;

            let hiringStatus = "";

            if (currentStatus === "declined") {
                hiringStatus = "Declined";
            } else if (currentPhase === "final" && currentStatus === "passed") {
                hiringStatus = "Hired";
            } else hiringStatus = "Select";

            this.setState({
                trackedData: {
                    currentPhase: currentPhase,
                    currentStatus: currentStatus,
                    timeOfLastInterview: timeOfLastInterview,
                    hiringStatus: hiringStatus
                }
            });
        } else {
            this.setState({
                trackedData: {
                    currentPhase: "none",
                    currentStatus: "",
                    timeOfLastInterview: null,
                    hiringStatus: "Select"
                }
            });
        }

    }

    switchComponents() {
        const { filteredCandidates, filteredCompanies, phase, next, selectedElementId, report, trackedData, error } = this.state;

        if (phase === 1) {
            return <SelectCandidate
                next={next}
                candidates={filteredCandidates}
                onSearch={this.filterCandidates}
                onSelect={this.onSelect}
                selectedId={selectedElementId}
                onBack={this.onBack}
                onNext={this.onNext}
            />;
        } else if (phase === 2) {
            return <SelectCompany
                next={next}
                companies={filteredCompanies}
                onSearch={this.filterCompanies}
                onSelect={this.onSelect}
                selectedId={selectedElementId}
                onBack={this.onBack}
                onNext={this.onNext}
            />;
        } else {
            return <FillReport
                trackedData={trackedData}
                onBack={this.onBack}
                onSubmit={this.onSubmit}
            />;
        }
    }

    render() {
        const { filteredCandidates, filteredCompanies, phase, next, selectedElementId, report, trackedData, error } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-12 card mb-4">
                        <div className="row card-body">

                            <aside className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-4 col-xl-3">
                                <Aside
                                    phase={phase}
                                    info={report}
                                />
                            </aside>

                            <main className="col-12 col-md-8 col-xl-9">
                                {this.switchComponents()}

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