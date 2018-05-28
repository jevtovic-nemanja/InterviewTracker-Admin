import React from "react";

import styles from "./deleteReport.css";

export const DeleteReport = ({ deleteReport, message, close }) => {
    return (
        <div className="row mt-4 pt-1">
            {
                message
                    ? <div className="col-12">
                        <p className="mb-4">{message}</p>
                        <div className="float-right">
                            <button
                                type="button"
                                onClick={close}
                                className={`btn ${styles.btnClose}`}
                            >Close</button>
                        </div>
                    </div>

                    : <div className="col-12">
                        <p className="mb-4">Are you sure you wish to delete this report?</p>
                        <div className="float-right">
                            <button
                                type="button"
                                onClick={deleteReport}
                                className={`btn ${styles.btnDelete} mr-2`}
                            >Yes</button>
                            <button
                                type="button"
                                onClick={close}
                                className={`btn ${styles.btnClose}`}
                            >No</button>
                        </div>
                    </div>
            }
        </div>
    );
};