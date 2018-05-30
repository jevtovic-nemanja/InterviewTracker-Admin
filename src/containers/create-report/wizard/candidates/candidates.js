import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Message } from "Components/common/message/message";
import { NextButton } from "Components/common/buttons/next/nextButton";
import Search from "Containers/common/search/search";
import { CandidateDisplay } from "Components/create-report/wizard/candidates/candidateDisplay";

import {
    selectElement,
    enableNextPhase,
    newReportCandidate,
    incrementPhase
} from "Store/actions";

import { Messages, Routes } from "Src/constants";

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
    searchRef = React.createRef();

    componentDidMount() {
        this.searchRef.current.getWrappedInstance().focus();
    }

    render() {
        const { candidates, message, selectedElementId, next } = this.props;
        const { selectElement, newReportCandidate, enableNextPhase, incrementPhase } = this.props;

        return (
            <div className="row">

                <div className="col-8 offset-sm-1 col-sm-7 col-md-8 offset-xl-0 col-xl-9">
                    <Search ref={this.searchRef} />
                </div>

                <div className="col-4 col-sm-3 mt-1">
                    <NextButton next={next} incrementPhase={incrementPhase} newLocation={Routes.CREATE_REPORT_COMPANIES} />
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
                                    selected={selectedElementId}
                                    handleClick={() => {
                                        selectElement(candidate.candidateId);
                                        newReportCandidate(candidate);
                                        enableNextPhase();
                                    }}
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