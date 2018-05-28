import React from "react";

import styles from "./backButton.css";

export const BackButton = ({ decrementPhase, newLocation }) => {
    return (
        <button
            type="button"
            onClick={() => {
                decrementPhase();
                location.hash = newLocation;
            }}
            className={`btn ${styles.btnBack} w-100`}
        >Back</button>
    );
};