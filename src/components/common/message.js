import React from "react";

export const Message = ({ message }) => {
    return (
        <div className="col-12 mt-4">
            <h5 className="text-center">{message}</h5>
        </div>
    );
};