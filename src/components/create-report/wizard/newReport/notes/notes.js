import React from "react";

import { Placeholders } from "Src/constants";

export const Notes = ({ labelText, value, onChange, declined }) => {
    return (
        <>
            <label>{labelText}</label>
            <textarea
                name="note"
                rows="5"
                placeholder={Placeholders.NOTES}
                value={value}
                onChange={onChange}
                className="form-control"
                disabled={declined}
            />
        </>
    );
};