import React from "react";

export const DeleteReport = props => {
    return (
        <div className="row mt-4 pt-1">
            <div className="col-12">
                <p className="mb-4">Are you sure you wish to delete this report?</p>
                <div className="float-right">
                    <button type="button" className="btn btn-delete mr-2" onClick={props.deleteReport} >Yes</button>
                    <button type="button" className="btn btn-close" onClick={props.close} >No</button>
                </div>
            </div>
        </div>
    );
};