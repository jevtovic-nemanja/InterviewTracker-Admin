import React from "react";

export const CompanyDisplay = ({ company, selected, handleClick }) => {
    const { companyId, name } = company;
    const isSelected = selected === companyId ? "selected" : "";

    return (
        <tr
            key={companyId}
            onClick={handleClick}
        >
            <td className={`${isSelected}`}>{name}</td>
        </tr>
    );
};