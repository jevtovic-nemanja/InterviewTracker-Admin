import React from "react";

import Search from "../../common/search";

export const SelectCandidate = props => {

    return (
        <div className="row">
            <div className="col-12 offset-sm-1 col-sm-10 offset-lg-5 col-lg-6">
                <Search />
            </div>

            {props.candidates.map(candidate => {
                const { id, name, email, avatar } = candidate;
                return (
                    <div key={id} className="col-12 offset-sm-1 col-sm-10">
                        <div className="card candidate-card mx-auto my-2 p-2">
                            <div className="row">
                                <div className="col-3 text-center">
                                    <img
                                        src={avatar ? avatar : "../../../assets/images/avatar.png"}
                                        alt="Candidate picture"
                                        className="rounded-circle candidate-img w-100"
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