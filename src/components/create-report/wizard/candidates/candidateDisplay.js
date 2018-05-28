import React from "react";

import defaultAvatar from "../../../../assets/images/avatar.png";

import styles from "./candidateDisplay.css";

export const CandidateDisplay = ({ candidate, selected, handleClick }) => {
    const { candidateId, name, email, avatar } = candidate;
    const isSelected = selected === candidateId ? styles.selected : "";

    return (
        <div
            onClick={handleClick}
            className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11 offset-xl-0 col-xl-6 candidate-div"
        >
            <div className={`card ${styles.candidateCard} mx-auto my-2 p-2 ${isSelected}`}>
                <div className="row">
                    <div className="col-3 text-center">
                        <img
                            src={
                                avatar
                                    ? avatar
                                    : defaultAvatar
                            }
                            alt="Candidate picture"
                            className={`rounded-circle ${styles.candidateImg} w-50`}
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