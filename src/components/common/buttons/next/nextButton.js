import React from "react";

export const NextButton = ({ next, incrementPhase, newLocation }) => {
    return (
        <button
            type="button"
            disabled={next}
            onClick={() => {
                incrementPhase();
                location.hash = newLocation;
            }}
            className={`${next} btn btn-next w-100`}
        >Next</button>
    );
};