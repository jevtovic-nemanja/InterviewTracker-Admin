import React from "react";

import Modal from "react-responsive-modal";

import Search from "../../containers/searchContainer";
import { ReportDisplay } from "./reportDisplay";
import { ReportDetails } from "./reportDetails";
import { DeleteReport } from "./deleteReport";

class ReportsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    initState = () => ({
        detailsModal: false,
        detailedReport: {},
        deleteModal: false,
        deleteReportId: ""
    })

    componentDidMount = () => {
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

    closeMessageModal = () => {
        const { open, closeMessageModal } = this.props;
        
        if (open) {
            closeMessageModal();
        }
    }

    render = () => {
        const { loading, reports, message, open, closeMessageModal } = this.props;
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
                                        <div className="col-12 mt-4" key={report.id}>
                                            <h5 className="text-center">{report.message}</h5>
                                        </div>
                                    );
                                } else {
                                    return <ReportDisplay
                                        key={report.id}
                                        report={report}
                                        openDeleteModal={this.openDeleteModal}
                                        openDetailsModal={this.openDetailsModal}
                                    />;
                                }
                            })

                            : <div className="col-12 mt-4">
                                <h5 className="text-center">{message}</h5>
                            </div>
                    }

                </div>

                <Modal open={detailsModal} onClose={this.closeDetailsModal} little >
                    <ReportDetails report={detailedReport} />
                </Modal>

                <Modal open={deleteModal} onClose={this.closeDeleteModal} little >
                    <DeleteReport deleteReport={this.deleteReport} close={this.closeDeleteModal} message={message} />
                </Modal>

                <Modal open={open} onClose={this.closeMessageModal} little >
                    <div className="col-12">
                        <p className="mb-4">{message}</p>
                        <div className="float-right">
                            <button
                                type="button"
                                onClick={this.closeMessageModal}
                                className="btn btn-close"
                            >Close</button>
                        </div>
                    </div>
                </Modal>

            </main>
        );
    }
}

export default ReportsList;