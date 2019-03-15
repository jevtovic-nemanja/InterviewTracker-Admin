import React from "react";

import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Candidates, { filterCandidates } from "Containers/create-report/wizard/candidates/candidates";

import Search from "Containers/common/search/search";
import { CandidateDisplay } from "Components/create-report/wizard/candidates/candidateDisplay";
import { Message } from "Components/common/message/message";
import { Button } from "Components/common/button/button";

import {
    selectElement,
    enableNextPhase,
    newReportCandidate
} from "Store/actions";

import { DISABLED, Messages } from "Src/constants";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

describe("<Candidates />", () => {
    let wrapper;
    let store;

    const setUpTest = newProps => {
        store = mockedStore(
            {
                data: {
                    candidates: [
                        {
                            candidateId: 27,
                            name: "John Doe",
                            email: "john.doe@email.com",
                            avatar: "url"
                        },
                        {
                            candidateId: 101,
                            name: "Jane Smith",
                            email: "jane.smith@email.com",
                            avatar: ""
                        }
                    ]
                },
                enableNextPhase: DISABLED,
                message: "",
                searchItem: "",
                selectedElementId: "",
                ...newProps
            }
        );

        wrapper = mount(
            <Provider store={store}>
                <Candidates />
            </Provider>
        );
    };

    afterEach(() => {
        wrapper.unmount();
    });

    it("renders a Search component and a Next button", () => {
        setUpTest();

        expect(wrapper.find(Search)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).text()).toEqual("Next");
    });

    it("displays the correct message if fetching candidates fails", () => {
        setUpTest({
            data: {
                candidates: []
            },
            message: "message"
        });

        expect(wrapper.find(CandidateDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
    });

    it("displays the correct message if no candidates match the filter criteria", () => {
        setUpTest({ searchItem: "wz" });

        expect(wrapper.find(CandidateDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(Messages.NO_CANDIDATES);
    });

    describe("if there are candidates that match the filter criteria", () => {
        beforeEach(() => {
            setUpTest({ searchItem: "doe" });
        });

        it("renders a <CandidateDisplay /> component for each candidate", () => {
            const state = store.getState();

            expect(wrapper.find(CandidateDisplay)).toHaveLength(filterCandidates(state.data.candidates, state.searchItem).length);
        });

        it("calls the correct actions", () => {
            const candidate = store.getState().data.candidates[0];

            wrapper.find(CandidateDisplay).first().props().handleClick();

            expect(store.getActions()).toEqual([selectElement(candidate.candidateId), newReportCandidate(candidate), enableNextPhase()]);
        });
    });
});