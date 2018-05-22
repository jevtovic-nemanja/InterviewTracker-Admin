import React from "react";

import defaultAvatar from "../../../../assets/images/avatar.png";

export const CandidateDisplay = ({ candidate, selectedElementId, selectElement, enableNextPhase, newReportCandidate }) => {
    const { candidateId, name, email, avatar } = candidate;
    const selected = selectedElementId === candidateId ? "selected" : "";

    return (
        <div
            onClick={() => {
                selectElement(candidateId);
                newReportCandidate(candidate);
                enableNextPhase();
            }}
            className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11 offset-xl-0 col-xl-6 candidate-div"
        >
            <div className={`card candidate-card mx-auto my-2 p-2 ${selected}`}>
                <div className="row">
                    <div className="col-3 text-center">
                        <img
                            src={
                                avatar
                                    ? avatar
                                    : defaultAvatar
                            }
                            alt="Candidate picture"
                            className="rounded-circle candidate-img w-50"
                        />
                    </div>
                    <div className="col-9 d-flex flex-column justify-content-center">
                        <h5 className="card-title mb-0">{name}</h5>
                        <p className="card-text d-none d-sm-block">{email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};