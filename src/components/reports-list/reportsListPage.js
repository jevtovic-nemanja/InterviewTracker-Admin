import React from "react";

import Modal from "react-responsive-modal";

import { BASE_URL } from "../../constants";
import { dataService } from "../services/dataService";

import Search from "../common/search";
import { ReportDisplay } from "./reportDisplay";
import { ReportDetails } from "./reportDetails";

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
            detailedReport: {},
            error: ""
        };
    }

    bindEventHandlers() {
        this.filterReports = this.filterReports.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    openModal(id) {
        const { allReports } = this.state;
        const report = allReports.filter(report => report.id === parseInt(id))[0];
        this.setState({
            modal: true,
            detailedReport: report
        });
    }

    closeModal() {
        this.setState({ modal: false });
    }

    deleteReport() {
        
    }


    render() {
        const { allReports, filteredReports, modal, detailedReport, error } = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <Search onSearch={this.filterReports} />

                    {filteredReports.map(report =>
                        <ReportDisplay key={report.id} report={report} openModal={this.openModal} />
                    )}

                    <div className="col-12 mt-4">
                        <h5 className="text-center">{error}</h5>
                    </div>
                </div>

                <Modal open={modal} onClose={this.closeModal} little >
                    <ReportDetails report={detailedReport} />
                </Modal>
            </div>

        );
    }
}

export default ReportsListPage;