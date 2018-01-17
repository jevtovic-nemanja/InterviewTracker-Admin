import React from "react";

import Search from "../../common/search";

export const SelectCompany = props => {
    return (
        <div className="row">
            <div className="col-12 offset-sm-1 col-sm-10 col-md-11 offset-lg-6 col-lg-6 offset-xl-6 col-xl-6">
                <Search onSearch={props.onSearch} />
            </div>
            <div className="col-12 offset-sm-1 col-sm-10 offset-md-1 col-md-11">
                <table className="table table-striped table-bordered">
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