import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Message } from "Components/common/message";
import Search from "Containers/common/search/search";
import { CandidateDisplay } from "Components/create-report/wizard/candidates/candidateDisplay";

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

class SelectCandidate extends React.Component {

    getSelectedCandidate = (selectedCandidateId) => {
        const selectedCandidate = this.props.candidates.filter(candidate => candidate.candidateId === selectedCandidateId).shift();
        return selectedCandidate;
    };

    render() {
        const { candidates, message, selectedElementId, next } = this.props;
        const { selectElement, newReportCandidate, enableNextPhase, incrementPhase } = this.props;

        const props = {
            selectedElementId,
            selectElement,
            newReportCandidate,
            enableNextPhase
        };

        return (
            <div className="row">

                <div className="col-8 offset-sm-1 col-sm-7 col-md-8 offset-xl-0 col-xl-9">
                    <Search />
                </div>

                <div className="col-4 col-sm-3 mt-1">
                    <button
                        type="button"
                        disabled={next}
                        onClick={() => {
                            incrementPhase();
                            location.hash = "#/create-report/2";
                        }}
                        className={`${next} btn btn-next w-100`}
                    >Next</button>
                </div>

                {
                    candidates.length
                        ? candidates.map(candidate => {

                            if (candidate.message) {
                                return (
                                    <Message key={candidate.id} message={candidate.message} />
                                );
                            }

                            return (
                                <CandidateDisplay
                                    key={candidate.candidateId}
                                    candidate={candidate}
                                    getSelectedCandidate={this.getSelectedCandidate}
                                    {...props}
                                />
                            );
                        })

                        : <Message message={message} />
                }

            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCandidate);