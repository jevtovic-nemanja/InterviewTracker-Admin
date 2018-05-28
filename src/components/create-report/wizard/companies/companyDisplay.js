import React from "react";

import styles from "./companyDisplay.css";

export const CompanyDisplay = ({ company, selected, handleClick }) => {
    const { companyId, name } = company;
    const isSelected = selected === companyId ? styles.selected : "";

    return (
        <tr
            key={companyId}
            onClick={handleClick}
            className={`${isSelected}`}
        >
            <td>{name}</td>
        </tr>
    );
};