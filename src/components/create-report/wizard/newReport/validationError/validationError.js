import React from "react";

export const ValidationError = ({ isValid, text }) => {
    return (
        <div className={`${isValid} float-right pr-2`}>
            <small className="red">{text}</small>
        </div>
    );
};