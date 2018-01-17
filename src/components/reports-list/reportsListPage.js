import React from "react";

import Modal from "react-responsive-modal";

import { BASE_URL } from "../../constants";
import { dataService } from "../services/dataService";

import Search from "../common/search";
import { ReportDisplay } from "./reportDisplay";
import { ReportDetails } from "./reportDetails";
import { DeleteReport } from "./deleteReport";

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
            detailsModal: false,
            detailedReport: {},
            deleteModal: false,
            deleteId: "",
            error: ""
        };
    }

    bindEventHandlers() {
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
        this.filterReports = this.filterReports.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
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

    deleteReport() {
        const id = this.state.deleteId;

        dataService.deleteReport(id, response => {
            this.closeDeleteModal();
            this.loadData();
        }, error => this.handleError(error));
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

    openDeleteModal(id) {
        this.setState({
            deleteModal: true,
            deleteId: id
        });
    }

    closeDeleteModal() {
        this.setState({ deleteModal: false });
    }

    openDetailsModal(id) {
        const { allReports } = this.state;
        const report = allReports.filter(report => report.id === parseInt(id))[0];

        this.setState({
            detailsModal: true,
            detailedReport: report
        });
    }

    closeDetailsModal() {
        this.setState({ detailsModal: false });
    }

    render() {
        const { allReports, filteredReports, detailsModal, detailedReport, deleteModal, error } = this.state;

        return (
            <main className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search onSearch={this.filterReports} />
                    </div>

                    {filteredReports.map(report =>
                        <ReportDisplay key={report.id} report={report} openDetailsModal={this.openDetailsModal} deleteReport={this.openDeleteModal} />
                    )}

                    <div className="col-12 mt-4">
                        <h5 className="text-center">{error}</h5>
                    </div>
                </div>

                <Modal open={detailsModal} onClose={this.closeDetailsModal} little >
                    <ReportDetails report={detailedReport} />
                </Modal>

                <Modal open={deleteModal} onClose={this.closeDeleteModal} little >
                    <DeleteReport deleteReport={this.deleteReport} close={this.closeDeleteModal} />
                </Modal>
            </main>
        );
    }
}

export default ReportsListPage;