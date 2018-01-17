import React from "react";

import Search from "../../common/search";

export const SelectCandidate = props => {

    return (
        <div className="row">
            <div className="col-12 offset-sm-1 col-sm-10 col-md-11 offset-lg-6 col-lg-6 offset-xl-6 col-xl-6">
                <Search onSearch={props.onSearch} />
            </div>

            {props.candidates.map(candidate => {
                const { id, name, email, avatar } = candidate;
                return (
                    <div key={id} className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11 offset-xl-0 col-xl-6">
                        <div className="card candidate-card mx-auto my-2 p-2">
                            <div className="row">
                                <div className="col-3 text-center">
                                    <img
                                        src={avatar ? avatar : "../../../assets/images/avatar.png"}
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