import React from "react";

import moment from "moment";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import { Placeholders } from "Src/constants";

export const CustomDatePicker = ({ interviewDate, timeOfLastInterview, handleDateChange, disabled }) => {
    return (
        <>
            <label>Date:</label>
            <DatePicker
                dateFormat="DD.MM.YYYY"
                placeholderText={Placeholders.DATE_PICKER}
                selected={interviewDate}
                maxDate={moment()}
                minDate={moment(timeOfLastInterview, "DD-MM-YYYY")}
                onChange={handleDateChange}
                className="pl-2 form-control"
                disabled={disabled}
            />
        </>
    );
};