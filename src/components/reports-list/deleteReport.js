import React from "react";

export const DeleteReport = ({ deleteReport, close }) => {
    return (
        <div className="row mt-4 pt-1">
            <div className="col-12">
                <p className="mb-4">Are you sure you wish to delete this report?</p>
                <div className="float-right">
                    <button
                        type="button"
                        onClick={deleteReport}
                        className="btn btn-delete mr-2"
                    >Yes</button>
                    <button
                        type="button"
                        onClick={close}
                        className="btn btn-close"
                    >No</button>
                </div>
            </div>
        </div>
    );
};