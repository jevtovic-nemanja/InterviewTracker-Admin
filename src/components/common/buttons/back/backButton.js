import React from "react";

export const BackButton = ({ decrementPhase, newLocation }) => {
    return (
        <button
            type="button"
            onClick={() => {
                decrementPhase();
                location.hash = newLocation;
            }}
            className="btn btn-back w-100"
        >Back</button>
    );
};