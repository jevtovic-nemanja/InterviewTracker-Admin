import React from "react";
import { connect } from "react-redux";

import { SelectCandidate } from "../components/create-report/candidates";
import { selectElement, enableNextPhase, newReportCandidate, incrementPhase } from "../store/actions";

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

const getSelectedCandidate = (candidates, selectedCandidateId) => {
    const selectedCandidate = candidates.filter(candidate => candidate.candidateId === selectedCandidateId).shift();
    return selectedCandidate;
};

const mapStateToProps = state => ({
    candidates: filterCandidates(state.candidates, state.searchItem),
    message: state.message,
    selectedElementId: state.selectedElementId,
    next: state.enableNextPhase
});

const mapDispatchToProps = dispatch => ({
    onSelect: (candidates, id) => {
        dispatch(selectElement(id));
        dispatch(newReportCandidate(getSelectedCandidate(candidates, id)));
        dispatch(enableNextPhase());
    },
    onNext: () => {
        dispatch(incrementPhase());
        location.hash = "#/create-report/2";
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidate);