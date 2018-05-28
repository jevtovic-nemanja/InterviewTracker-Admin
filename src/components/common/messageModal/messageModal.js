import React from "react";

import styles from "./messageModal.css";

export const MessageModal = ({ message, close }) => {
    return (
        <div className="col-12">
            <p className="mb-4">{message}</p>
            <div className="float-right">
                <button
                    type="button"
                    onClick={close}
                    className={`btn ${styles.btnClose}`}
                >Close</button>
            </div>
        </div>
    );
};