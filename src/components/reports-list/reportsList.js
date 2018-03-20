import React from "react";

import Modal from "react-responsive-modal";

import Search from "../../containers/searchContainer";
import { ReportDisplay } from "./reportDisplay";
import { ReportDetails } from "./reportDetails";
import { DeleteReport } from "./deleteReport";

export const ReportsList = ({ loading, reports, message, detailsModal, detailedReport, deleteModal, deleteReportId, noFilterResults, openDetailsModal, closeDetailsModal, openDeleteModal, closeDeleteModal, deleteReport }) => {

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
                                    openDetailsModal={openDetailsModal}
                                />;
                            }
                        })

                        : <div className="col-12 mt-4">
                            <h5 className="text-center">{message}</h5>
                        </div>
                }

            </div>

            <Modal open={detailsModal} onClose={closeDetailsModal} little >
                <ReportDetails report={detailedReport} />
            </Modal>

            <Modal open={deleteModal} onClose={closeDeleteModal} little >
                <DeleteReport deleteReport={() => deleteReport()} close={closeDeleteModal} message={message} />
            </Modal>
        </main>
    );
};