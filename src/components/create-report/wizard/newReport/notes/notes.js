import React from "react";

export const Notes = ({ labelText, value, onChange, declined }) => {
    return (
        <div>
            <label>{labelText}</label>
            <textarea
                name="note"
                rows="5"
                placeholder="Notes..."
                value={value}
                onChange={onChange}
                className="form-control"
                disabled={declined}
            />
        </div>
    );
};