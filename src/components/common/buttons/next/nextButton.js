import React from "react";

import styles from "./nextButton.css";

export const NextButton = ({ next, incrementPhase, newLocation }) => {
    return (
        <button
            type="button"
            disabled={next}
            onClick={() => {
                incrementPhase();
                location.hash = newLocation;
            }}
            className={`${next} btn ${styles.btnNext} w-100`}
        >Next</button>
    );
};