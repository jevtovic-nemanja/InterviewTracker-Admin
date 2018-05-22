import React from "react";

export const CompanyDisplay = ({ company, selectedElementId, selectElement, newReportCompany, enableNextPhase }) => {
    const { companyId, name } = company;
    const selected = selectedElementId === companyId ? "selected" : "";

    return (
        <tr
            key={companyId}
            onClick={() => {
                selectElement(companyId);
                newReportCompany(company);
                enableNextPhase();
            }}
        >
            <td className={`${selected}`}>{name}</td>
        </tr>
    );
};