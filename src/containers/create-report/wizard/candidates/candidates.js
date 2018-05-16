import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SelectCandidate from "Components/create-report/wizard/selectCandidate/selectCandidate";

import {
    selectElement,
    enableNextPhase,
    newReportCandidate,
    incrementPhase
} from "Store/actions";

const filterCandidates = (candidates, searchItem) => {
    if (candidates.length) {
        const filteredCandidates = candidates.filter(candidate => candidate.name.toLowerCase().includes(searchItem));
        return filteredCandidates.length
            ? filteredCandidates
            : [{
                id: "NO_RESULTS",
                message: "No candidates match the search criteria."
            }];
    } else return [];
};

const mapStateToProps = state => ({
    candidates: filterCandidates(state.data.candidates, state.searchItem),
    message: state.message,
    selectedElementId: state.selectedElementId,
    next: state.enableNextPhase
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectElement,
    enableNextPhase,
    newReportCandidate,
    incrementPhase
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidate);