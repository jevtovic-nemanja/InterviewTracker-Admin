export const getDeleteReportId = state => state.deleteReportId;

export const getDataForSubmission = state => Object.assign(state.newReportData, state.newReportFormData);