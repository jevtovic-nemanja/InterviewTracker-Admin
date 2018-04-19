import React from "react";

export const Input = ({ inputItem, receiveInputChange }) => {
    return (
        <div className="input-group mt-1 mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fa fa-search"></i>
                </span>
            </div>

            <input
                type="text"
                value={inputItem}
                onChange={receiveInputChange}
                placeholder="Search..."
                className="form-control"
            />

        </div>
    );
};