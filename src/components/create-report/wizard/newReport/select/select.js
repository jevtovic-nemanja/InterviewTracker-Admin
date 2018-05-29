import React from "react";

export const Select = ({ labelText, name, value, onChange, declined, options }) => {
    return (
        <>
            <label>{labelText}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                disabled={declined}
            >

                {options.map((option, index) =>
                    index === 0
                        ? <option key={index} hidden>{option}</option>
                        : <option key={index}>{option}</option>
                )}
            </select>
        </>
    );
};