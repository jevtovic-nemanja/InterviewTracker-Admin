import React from "react";

import styles from "./companyDisplay.css";

export const CompanyDisplay = ({ company, selectedElementId, selectElement, newReportCompany, enableNextPhase }) => {
    const { companyId, name } = company;
    const selected = selectedElementId === companyId ? styles.selected : "";

    return (
        <tr
            key={companyId}
            onClick={() => {
                selectElement(companyId);
                newReportCompany(company);
                enableNextPhase();
            }}
            className={`${selected}`}
        >
            <td>{name}</td>
        </tr>
    );
};