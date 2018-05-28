import React from "react";

import moment from "moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

export const CustomDatePicker = ({ interviewDate, timeOfLastInterview, handleDateChange, disabled }) => {
    return (
        <div>
            <label>Date:</label>
            <DatePicker
                dateFormat="DD.MM.YYYY"
                placeholderText="Click to select a date"
                selected={interviewDate}
                maxDate={moment()}
                minDate={moment(timeOfLastInterview, "DD-MM-YYYY")}
                onChange={handleDateChange}
                className="pl-2 form-control"
                disabled={disabled}
            />
        </div>
    );
};