import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Modal from "react-responsive-modal";

import { Message } from "Components/common/message/message";
import Search from "Containers/common/search/search";
import { ReportDisplay } from "Components/reports-list/reportDisplay/reportDisplay";
import { ReportDetails } from "Components/reports-list/reportDetails/reportDetails";
import { DeleteReport } from "Components/reports-list/deleteReport/deleteReport";
import { withErrorModal } from "Hocs/withErrorModal";

import {
    startFetchData,
    startDeleteReport,
    closeMessageModal
} from "Store/actions";

import { Messages } from "Src/constants";

const filterReports = (reports, searchItem) => {
    if (reports.length) {
        const filteredReports = reports.filter(report => {
            const candidate = report.candidateName.toLowerCase();
            const company = report.companyName.toLowerCase();
            return candidate.includes(searchItem) || company.includes(searchItem);
        });
        return filteredReports.length
            ? filteredReports
            : [{
                id: Messages.NO_RESULTS,
                message: Messages.NO_REPORTS
            }];
    } else return [];
};

const mapStateToProps = state => ({
    reports: filterReports(state.data.reports, state.searchItem),
    message: state.message,
    open: state.messageModal
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startFetchData,
    startDeleteReport,
    closeMessageModal
}, dispatch);

class ReportsList extends React.Component {
    state = {
        detailsModal: false,
        detailedReport: {},
        deleteModal: false,
        deleteReportId: ""
    }

    componentDidMount() {
        this.props.startFetchData();
    }

    openDetailsModal = report => {
        this.setState({
            detailsModal: true,
            detailedReport: report
        });
    }

    closeDetailsModal = () => {
        this.setState({
            detailsModal: false,
            detailedReport: {}
        });
    }

    openDeleteModal = id => {
        this.setState({
            deleteModal: true,
            deleteReportId: id
        });
    }

    closeDeleteModal = () => {
        this.setState({
            deleteModal: false,
            deleteReportId: ""
        });
    }

    deleteReport = () => {
        const { deleteReportId } = this.state;

        this.props.startDeleteReport(deleteReportId);
        this.closeDeleteModal();
    }

    render() {
        const { reports, message, open } = this.props;
        const { detailsModal, detailedReport, deleteModal, deleteReportId } = this.state;

        return (
            <main className="container">
                <div className="row mt-4">

                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search />
                    </div>

                    {
                        reports.length
                            ? reports.map(report => {
                                if (report.message) {
                                    return (
                                        <Message key={report.id} message={report.message} />
                                    );
                                } else {
                                    return <ReportDisplay
                                        key={report.id}
                                        report={report}
                                        openDeleteModal={() => this.openDeleteModal(report.id)}
                                        openDetailsModal={() => this.openDetailsModal(report)}
                                    />;
                                }
                            })

                            : <Message message={message} />
                    }

                </div>

                <Modal open={detailsModal} onClose={this.closeDetailsModal} little >
                    <ReportDetails report={detailedReport} />
                </Modal>

                <Modal open={deleteModal} onClose={this.closeDeleteModal} little >
                    <DeleteReport deleteReport={this.deleteReport} close={this.closeDeleteModal} message={message} />
                </Modal>
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorModal(ReportsList));