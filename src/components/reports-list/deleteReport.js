import React from "react";

export const DeleteReport = props => {
    return (
        <div className="row">
            <div className="col-12">
                <p>Are you sure you wish to delete this report?</p>
                <div className="float-right">
                    <button type="button" className="btn" onClick={props.deleteReport}>Yes</button>
                    <button type="button" className="btn" onClick={props.close}>No</button>
                </div>
            </div>
        </div>
    );
};