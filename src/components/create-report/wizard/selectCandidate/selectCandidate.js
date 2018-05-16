import React from "react";

import Search from "Containers/common/search/search";

import defaultAvatar from "../../../../assets/images/avatar.png";

class SelectCandidate extends React.Component {

    getSelectedCandidate = (candidates, selectedCandidateId) => {
        const selectedCandidate = candidates.filter(candidate => candidate.candidateId === selectedCandidateId).shift();
        return selectedCandidate;
    };

    render() {
        const { candidates, message, selectedElementId, next, selectElement, newReportCandidate, enableNextPhase, incrementPhase } = this.props;

        return (
            <div className="row">

                <div className="col-8 offset-sm-1 col-sm-7 col-md-8 offset-xl-0 col-xl-9">
                    <Search />
                </div>

                <div className="col-4 col-sm-3 mt-1">
                    <button
                        type="button"
                        disabled={next}
                        onClick={() => {
                            incrementPhase();
                            location.hash = "#/create-report/2";
                        }}
                        className={`${next} btn btn-next w-100`}
                    >Next</button>
                </div>

                {
                    candidates.length
                        ? candidates.map(candidate => {

                            if (candidate.message) {
                                return (
                                    <div className="col-12 mt-4" key={candidate.id}>
                                        <h5 className="text-center">{candidate.message}</h5>
                                    </div>
                                );
                            }

                            const { candidateId, name, email, avatar } = candidate;
                            const selected = selectedElementId === candidateId ? "selected" : "";

                            return (
                                <div
                                    key={candidateId}
                                    id={candidateId}
                                    onClick={() => {
                                        selectElement(candidateId);
                                        newReportCandidate(this.getSelectedCandidate(candidates, candidateId));
                                        enableNextPhase();
                                    }}
                                    className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11 offset-xl-0 col-xl-6"
                                >
                                    <div className={`card candidate-card mx-auto my-2 p-2 ${selected}`}>
                                        <div className="row">
                                            <div className="col-3 text-center">
                                                <img
                                                    src={avatar
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
                        })

                        : <div className="col-12 mt-4">
                            <h5 className="text-center">{message}</h5>
                        </div>
                }

            </div >
        );
    }
};

export default SelectCandidate;