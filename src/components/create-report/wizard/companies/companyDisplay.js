import React from "react";

export const CompanyDisplay = ({ company, selectedElementId, selectElement, newReportCompany, getSelectedCompany, enableNextPhase }) => {
    const { companyId, name } = company;
    const selected = selectedElementId === companyId ? "selected" : "";

    return (
        <tr
            key={companyId}
            id={companyId}
            onClick={() => {
                selectElement(companyId);
                newReportCompany(getSelectedCompany(companyId));
                enableNextPhase();
            }}
        >
            <td className={`${selected}`}>{name}</td>
        </tr>
    );
};