import React from "react";

import Search from "../../common/search";

export const SelectCompany = ({ companies, onSearch, onSelect, next, onBack, onNext }) => {

    function handleClick(event) {
        const element = event.target;
        onSelect("companyId", element);
    }

    return (
        <div className="row mt-2">

            <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12 mb-3">
                <div className="row">

                    <div className="col-5 col-md-4 col-lg-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="btn btn-back w-100"
                        >Back</button>
                    </div>

                    <div className="offset-2 col-5 offset-md-4 col-md-4 offset-lg-6 col-lg-3">
                        <button
                            type="button"
                            disabled={next}
                            onClick={onNext}
                            className={`${next} btn btn-next w-100`}
                        >Next</button>
                    </div>

                </div>
            </div>

            <div className="col-12 offset-sm-1 col-sm-10 offset-md-0 col-md-12">
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