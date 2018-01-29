import React from "react";

import Search from "../../common/search";

export const SelectCandidate = ({ phase, candidates, onSearch, onSelect, next, onNext }) => {
    const show = phase === 1 ? "" : "d-none";

    function handleClick(event) {
        const element = event.target;
        onSelect("candidateId", element);
    }

    return (
        <div className={`${show} row`}>

            <div className="col-8 offset-sm-1 col-sm-7 col-md-8 offset-xl-0 col-xl-9">
                <Search onSearch={onSearch} />
            </div>
            
            <div className="col-4 col-sm-3 mt-1">
                <button
                    type="button"
                    disabled={next}
                    onClick={onNext}
                    className={`${next} btn btn-next w-100`}
                >Next</button>
            </div>

            {candidates.map(({ candidateId, name, email, avatar }) => {
                return (
                    <div
                        key={candidateId}
                        id={candidateId}
                        onClick={handleClick}
                        className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11 offset-xl-0 col-xl-6"
                    >
                        <div className="card candidate-card mx-auto my-2 p-2">
                            <div className="row">
                                <div className="col-3 text-center">
                                    <img
                                        src={avatar
                                            ? avatar
                                            : "../../../assets/images/avatar.png"
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
            })}

        </div>
    );
};