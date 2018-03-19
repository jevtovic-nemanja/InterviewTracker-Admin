import React from "react";

import Modal from "react-responsive-modal";

import Search from "../../containers/searchContainer";
import { ReportDisplay } from "./reportDisplay";
import { ReportDetails } from "./reportDetails";
import { DeleteReport } from "./deleteReport";

export const ReportsList = ({ loading, reports, error, detailsModal, detailedReport, openDetailsModal, closeDetailsModal }) => {

    if (loading) {
        return (
            <main className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search />
                    </div>
                    <div className="col-12 mt-4">
                        <h5 className="text-center">Loading...</h5>
                    </div>
                </div>
            </main>
        );
    }

    if (!reports.length) {
        return (
            <main className="container">
                <div className="row mt-4">
                    <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                        <Search />
                    </div>
                    <div className="col-12 mt-4">
                        <h5 className="text-center">{error}</h5>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="container">
            <div className="row mt-4">

                <div className="offset-1 col-10 offset-sm-0 col-sm-7 offset-md-1 col-md-6 col-lg-5">
                    <Search />
                </div>

                {reports.map(report =>
                    <ReportDisplay
                        key={report.id}
                        report={report}
                        // deleteReport={this.openDeleteModal}
                        openDetailsModal={openDetailsModal}
                    />
                )}

            </div>

            <Modal open={detailsModal} onClose={closeDetailsModal} little >
                <ReportDetails report={detailedReport} />
            </Modal>

            {/* <Modal open={deleteModal} onClose={this.closeDeleteModal} little >
                <DeleteReport deleteReport={this.deleteReport} close={this.closeDeleteModal} />
            </Modal> */}
        </main>
    );
};