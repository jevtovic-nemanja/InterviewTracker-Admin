import React from "react";

import styles from "./button.css";

export const Button = ({ isDisabled = "", type, action, newLocation }) => {
    const labels = {
        "btnBack": "Back",
        "btnNext": "Next",
        "btnSubmit": "Submit"
    };

    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={event => {
                action(event);
                if (newLocation) {
                    location.hash = newLocation;
                }
            }}
            className={`${isDisabled} btn ${styles.button} ${styles[type]} w-100`}
        >{labels[type]}</button>
    );
};