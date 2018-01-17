import React from "react";

export const Aside = props => {

    return (
        <div className="row wizard-aside">
            <div className="col-12">
                <div className="bottom-line-aside">
                    <h5 className="mt-3">
                        <small className="fa-stack">
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">1</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Select Candidate
                        </span>
                    </h5>
                    <h5 className="mt-3">
                        <small className="fa-stack">
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">2</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Select Company
                        </span>
                    </h5>
                    <h5 className="mt-3 mb-4">
                        <small className="fa-stack">
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">3</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Fill Report Detail
                        </span>
                    </h5>
                </div>
                <div>
                    <div className="pl-1">
                        <p className="mt-3 mb-1">Candidate:</p>
                        <h4>Candidate Name</h4>
                    </div>
                    <div className="pl-1">
                        <p className="mb-1">Company:</p>
                        <h4>Company Name</h4>
                    </div>
                </div>
                <button type="button" className="btn btn-next w-100 mt-5">Next</button>
            </div>
        </div>
    );
};