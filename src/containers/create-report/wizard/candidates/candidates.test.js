import React from "react";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Candidates from "./candidates";

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
        const store = mockedStore(
            createTestState()
        );

        const wrapper = mount(
            <Provider store={store}>
                <Candidates />
            </Provider>
        );

        it("renders a Search component and a Next button", () => {
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(Button)).toHaveLength(1);
            expect(wrapper.find(Button).text()).toEqual("Next");
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

        const wrapper = mount(
            <Provider store={store}>
                <Candidates />
            </Provider>
        );

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

        const wrapper = mount(
            <Provider store={store}>
                <Candidates />
            </Provider>
        );

        it("displays the correct message ", () => {
            expect(wrapper.find(CandidateDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(Messages.NO_CANDIDATES);
        });
    });

    describe("if there are candidates that match the filter criteria", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState({ searchItem: "doe" })
            );

            wrapper = mount(
                <Provider store={store}>
                    <Candidates />
                </Provider>
            );
        });

        it("renders a <CandidateDisplay /> component for each candidate", () => {
            const state = store.getState();
            const candidates = state.data.candidates;
            const searchItem = state.searchItem;

            expect(wrapper.find(CandidateDisplay)).toHaveLength(candidates.filter(candidate => candidate.name.toLowerCase().includes(searchItem)).length);
        });

        it("calls the correct actions", () => {
            const candidate = store.getState().data.candidates[0];

            wrapper.find(CandidateDisplay).first().props().handleClick();

            expect(store.getActions()).toEqual([selectElement(candidate.candidateId), newReportCandidate(candidate), enableNextPhase()]);
        });
    });
});