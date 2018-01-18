import React from "react";

import Search from "../../common/search";

export const SelectCompany = props => {
    const show = props.phase === 2 ? "" : "d-none";

    function handleClick(event) {
        const element = event.target;
        props.onSelect("companyId", element);
    }

    return (
        <div className={`${show} row wizard-separator mt-4`}>
            <div className="col-12 offset-lg-6 col-lg-6">
                <Search onSearch={props.onSearch} />
            </div>
            <div className="col-12 mt-2">
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        {props.companies.map(company => {
                            const { id, name } = company;
                            return (
                                <tr key={id} id={id} onClick={handleClick}>
                                    <td>{name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};