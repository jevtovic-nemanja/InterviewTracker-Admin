const BASE_URL = "http://localhost:3333/api";

export const DISABLED = "disabled";

export const ApiUrls = {
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
    NO_RESULTS: "NO_RESULTS",
    NO_REPORTS: "No candidates or companies match the search criteria.",
    NO_CANDIDATES: "No candidates match the search criteria.",
    NO_COMPANIES: "No companies match the search criteria.",
    ERROR: "Looks like there was some kind of error. Don't worry, we're looking into it!",
    LOADING: "Loading...",
    validationErrorMessages: {
        DATE_ERROR: "Please select a date.",
        PHASE_ERROR: "Please select a phase.",
        STATUS_ERROR: "Please select a status.",
        NOTE_ERROR: "Please enter notes."
    }
};

export const ReportData = {
    phases: {
        NONE: "none",
        CV: "cv",
        HR: "hr",
        TECH: "tech",
        FINAL: "final",
        HIRED: "hired"
    },
    statuses: {
        PASSED: "passed",
        DECLINED: "declined"
    },
    hiringStatuses: {
        HIRED: "Hired",
        DECLINED: "Declined",
        SELECT: "Select"
    }
};