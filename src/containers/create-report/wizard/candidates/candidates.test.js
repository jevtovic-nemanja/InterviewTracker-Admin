import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Candidates from "./candidates";

import Search from "Containers/common/search/search";
import { CandidateDisplay } from "Components/create-report/wizard/candidates/candidateDisplay";
import { Message } from "Components/common/message/message";
import { NextButton } from "Components/common/buttons/next/nextButton";

import {
    selectElement,
    enableNextPhase,
    newReportCandidate,
    incrementPhase
} from "Store/actions";

import { DISABLED } from "Src/constants";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({
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
    ...props
});

describe("<Candidates />", () => {

    describe("always", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState()
            );
            wrapper = shallow(<Candidates store={store} />).dive();
        });

        it("renders a Search component and a Next button", () => {
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(NextButton)).toHaveLength(1);
        });

        it("calls the correct actions", () => {
            const candidate = wrapper.instance().props.candidates[0];

            wrapper.find(NextButton).props().incrementPhase();
            wrapper.find(CandidateDisplay).at(0).props().handleClick();

            expect(store.getActions()).toEqual([incrementPhase(), selectElement(candidate.candidateId), newReportCandidate(candidate), enableNextPhase()]);
        });
    });

    describe("if fetching candidates fails", () => {

        const store = mockedStore(
            createTestState({
                data: {
                    candidates: []
                },
                message: "message"
            })
        );

        const wrapper = shallow(<Candidates store={store} />).dive();

        it("displays the correct message", () => {
            expect(wrapper.find(CandidateDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
        });
    });

    describe("if no candidates match the filter criteria", () => {

        const store = mockedStore(
            createTestState({ searchItem: "wz" })
        );

        const wrapper = shallow(<Candidates store={store} />).dive();

        it("displays the correct message ", () => {
            expect(wrapper.find(CandidateDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(wrapper.instance().props.candidates[0].message);
        });
    });

    describe("if there are candidates that match the filter criteria", () => {

        const store = mockedStore(
            createTestState({ searchItem: "j" })
        );

        const wrapper = shallow(<Candidates store={store} />).dive();

        it("renders a <CandidateDisplay /> component for each candidate", () => {
            expect(wrapper.find(CandidateDisplay)).toHaveLength(wrapper.instance().props.candidates.length);
        });
    });
});