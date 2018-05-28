import React from "react";

import styles from "./validationError.css";

export const ValidationError = ({ isValid, text }) => {
    return (
        <div className={`${isValid} float-right pr-2`}>
            <small className={styles.red}>{text}</small>
        </div>
    );
};