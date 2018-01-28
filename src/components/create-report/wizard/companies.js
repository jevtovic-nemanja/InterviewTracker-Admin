import React from "react";

import Search from "../../common/search";

export const SelectCompany = ({ phase, companies, onSearch, onSelect }) => {
    const show = phase === 2 ? "" : "d-none";

    function handleClick(event) {
        const element = event.target;
        onSelect("companyId", element);
    }

    return (
        <div className={`${show} row mt-4`}>
            <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 offset-lg-6 col-lg-6">
                <Search onSearch={onSearch} />
            </div>
            <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 mt-2">
                <table className="table table-striped table-bordered table-hover">
                    <tbody>

                        {companies.map(({ companyId, name }) => {
                            return (
                                <tr key={companyId} id={companyId} onClick={handleClick}>
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