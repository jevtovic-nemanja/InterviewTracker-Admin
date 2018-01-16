import React from "react";

import Modal from "react-responsive-modal";

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
            modal: false,
            error: ""
        };
    }

    bindEventHandlers() {
        this.filterReports = this.filterReports.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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
        this.setState({ error: "Looks like there was some kind of error. Don't worry, we're looking into it!" });
    }

    filterReports(searchItem) {
        const { allReports } = this.state;
        const filteredReports = allReports.filter(report => {
            const candidate = report.candidate.toLowerCase();
            const company = report.company.toLowerCase();
            return candidate.includes(searchItem) || company.includes(searchItem);
        });
        filteredReports.length
            ? this.setState({ filteredReports: filteredReports, error: "" })
            : this.setState({ filteredReports: [], error: "No candidates or companies match the search criteria." });
    }

    toggleModal() {
        this.setState(prevState => {
            prevState.modal = !prevState.modal;
            return prevState;
        });
    }

    render() {
        const { allReports, filteredReports, modal, error } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <Search onSearch={this.filterReports} />

                    {filteredReports.map(report =>
                        <ReportDisplay key={report.id} report={report} toggleModal={this.toggleModal} />
                    )}

                    <div className="col-12 mt-4">
                        <h5 className="text-center">{error}</h5>
                    </div>
                </div>

                <Modal open={modal} onClose={this.toggleModal} >
                    
                </Modal>
            </div>

        );
    }
}

export default ReportsListPage;