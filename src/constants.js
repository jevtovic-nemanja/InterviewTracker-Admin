const BASE_URL = "http://localhost:3333/api";

export const API_URLS = {
    REPORTS: `${BASE_URL}/reports`,
    CANDIDATES: `${BASE_URL}/candidates`,
    COMPANIES: `${BASE_URL}/companies`
};

export const Routes = {
    REPORTS_LIST: "/",
    CREATE_REPORT_CANDIDATES: "/create-report/",
    CREATE_REPORT_COMPANIES: "/create-report/2",
    CREATE_REPORT_FORM: "/create-report/3"
};

export const Placeholders = {
    DATE_PICKER: "Click to select a date",
    NOTES: "Notes...",
    SEARCH: "Search..."
};

export const Messages = {
    DELETE_REPORT: "Are you sure you wish to delete this report?",
    validationErrorMessages: {
        DATE_ERROR: "Please select a date.",
        PHASE_ERROR: "Please select a phase.",
        STATUS_ERROR: "Please select a status.",
        NOTE_ERROR: "Please enter notes."
    }
};