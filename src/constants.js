const BASE_URL = "http://localhost:3333/api";

export const API_URLS = {
    REPORTS: `${BASE_URL}/reports`,
    CANDIDATES: `${BASE_URL}/candidates`,
    COMPANIES: `${BASE_URL}/companies`
};

export const Routes = {
    REPORTS_LIST: "/",
    CREATE_REPORT: "/create-report/"
};

export const ValidationErrorMessages = {
    DATE_ERROR: "Please select a date.",
    PHASE_ERROR: "Please select a phase.",
    STATUS_ERROR: "Please select a status.",
    NOTE_ERROR: "Please enter notes."
};