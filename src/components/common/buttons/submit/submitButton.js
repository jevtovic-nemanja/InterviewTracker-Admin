import React from "react";

export const SubmitButton = ({ declined, onSubmit }) => {
    return (
        <button
            type="button"
            disabled={declined}
            onClick={onSubmit}
            className={`btn btn-submit w-100 ${declined}`}
        >Submit</button>
    );
};