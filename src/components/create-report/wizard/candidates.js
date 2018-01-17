import React from "react";

import Search from "../../common/search";

export const SelectCandidate = props => {

    return (
        <div className="row">
            <div className="offset-1 col-10 offset-sm-1 col-sm-11 col-md-10 offset-lg-5 col-lg-6">
                <Search />
            </div>

            {props.candidates.map(candidate => {
                const { id, name, email, avatar } = candidate;
                return (
                    <div key={id} className="offset-1 col-10 offset-sm-1 col-sm-11 col-md-10">
                        <div className="card mb-3">
                            <div>
                                <img
                                    src={avatar ? avatar : "../../../assets/images/avatar.png"}
                                    alt="Candidate picture"
                                />
                            </div>
                            <div>
                                <h5>{name}</h5>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};