import React from "react";

import Search from "../../common/search";

export const SelectCompany = props => {
    return (
        <div className={`${props.show} row mt-4`}>
            <div className="col-12 offset-lg-6 col-lg-6">
                <Search onSearch={props.onSearch} />
            </div>
            <div className="col-12 mt-2">
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        {props.companies.map(company => {
                            const { id, name } = company;
                            return (
                                <tr key={id}>
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