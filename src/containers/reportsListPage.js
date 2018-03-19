import React from "react";

import Modal from "react-responsive-modal";

import { BASE_URL } from "../constants";
import { dataService } from "../services/dataService";

import Search from "../components/common/search";
import { ReportDisplay } from "../components/reports-list/reportDisplay";
import { ReportDetails } from "../components/reports-list/reportDetails";
import { DeleteReport } from "../components/reports-list/deleteReport";

import { startFetchReports, filterReportsSuccess, filterReportsFail } from "../store/actions";
import { connect } from "react-redux";

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
        this.props.loadReports();
    }

    deleteReport() {
        const id = this.state.deleteId;

        dataService.deleteReport(id, response => {
            this.closeDeleteModal();
            this.loadData();
        }, error => this.handleError(error));
    }

    filterReports(searchItem) {
        const { reports } = this.props;
        
        const filteredReports = reports.filter(report => {
            const candidate = report.candidate.toLowerCase();
            const company = report.company.toLowerCase();
            return candidate.includes(searchItem) || company.includes(searchItem);
        });

        filteredReports.length
            ? this.props.filterReportsSuccess(filteredReports)
            : this.props.filterReportsFail(filteredReports);
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
        const report = allReports.filter(report => report.id === parseInt(id)).shift();

        this.setState({
            detailsModal: true,
            detailedReport: report
        });
    }

    closeDetailsModal() {
        this.setState({ detailsModal: false });
    }

    render() {
        const { detailsModal, detailedReport, deleteModal } = this.state;
        const { filteredReports, error, loading } = this.props;

        if (loading) {
            return (
                <div>
                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search onSearch={this.filterReports} />
                    </div>
                    <div className="col-12 mt-4">
                        <h5 className="text-center">Loading...</h5>
                    </div>
                </div>
            );
        }

        return (
            <main className="container">
                <div className="row mt-4">

                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search onSearch={this.filterReports} />
                    </div>

                    {filteredReports.map(report =>
                        <ReportDisplay
                            key={report.id}
                            report={report}
                            deleteReport={this.openDeleteModal}
                            openDetailsModal={this.openDetailsModal}
                        />
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

const mapStateToProps = state => ({
    loading: state.loading,
    reports: state.reports,
    filteredReports: state.filteredReports,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    loadReports: () => dispatch(startFetchReports()),
    filterReportsSuccess: filteredReports => dispatch(filterReportsSuccess(filteredReports)),
    filterReportsFail: filteredReports => dispatch(filterReportsFail(filteredReports))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsListPage);