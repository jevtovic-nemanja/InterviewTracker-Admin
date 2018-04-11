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
        detailedReport: {}
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

    render = () => {
        const { loading, reports, message, deleteModal, deleteReportId, openDeleteModal, closeDeleteModal, startDeleteReport } = this.props;
        const { detailsModal, detailedReport } = this.state;

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
                                        openDeleteModal={openDeleteModal}
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

                <Modal open={deleteModal} onClose={closeDeleteModal} little >
                    <DeleteReport deleteReport={() => startDeleteReport()} close={closeDeleteModal} message={message} />
                </Modal>
            </main>
        );
    }
}

export default ReportsList;