import React from "react";

import styles from "./submitButton.css";

export const SubmitButton = ({ declined, onSubmit }) => {
    return (
        <button
            type="button"
            disabled={declined}
            onClick={onSubmit}
            className={`btn ${styles.btnSubmit} w-100 ${declined}`}
        >Submit</button>
    );
};