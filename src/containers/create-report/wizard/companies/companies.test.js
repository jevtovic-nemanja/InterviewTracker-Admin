import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Companies from "./companies";

import Search from "Containers/common/search/search";
import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";
import { Message } from "Components/common/message/message";
import { BackButton } from "Components/common/buttons/back/backButton";
import { NextButton } from "Components/common/buttons/next/nextButton";

import {
    selectElement,
    enableNextPhase,
    incrementPhase,
    decrementPhase,
    newReportCompany
} from "Store/actions";

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestState = props => ({
    data: {
        companies: [
            {
                companyId: 10,
                name: "Endava"
            },
            {
                companyId: 11,
                name: "Quantox"
            }
        ]
    },
    enableNextPhase: "disabled",
    message: "",
    searchItem: "",
    selectedElementId: "",
    ...props
});

describe("<Companies />", () => {

    describe("always", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState()
            );
            wrapper = shallow(<Companies store={store} />).dive();
        });

        it("renders the correct components", () => {
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(BackButton)).toHaveLength(1);
            expect(wrapper.find(NextButton)).toHaveLength(1);
            expect(wrapper.find("table")).toHaveLength(1);
        });

        it("calls the correct actions", () => {
            wrapper.find(BackButton).props().decrementPhase();
            wrapper.find(NextButton).props().incrementPhase();
            wrapper.find(CompanyDisplay).at(0).props().selectElement();
            wrapper.find(CompanyDisplay).at(0).props().newReportCompany();
            wrapper.find(CompanyDisplay).at(0).props().enableNextPhase();

            expect(store.getActions()).toEqual([decrementPhase(), incrementPhase(), selectElement(), newReportCompany(), enableNextPhase()]);
        });
    });

    describe("if fetching companies fails", () => {

        const store = mockedStore(
            createTestState({
                data: {
                    companies: []
                },
                message: "message"
            })
        );

        const wrapper = shallow(<Companies store={store} />).dive();

        it("displays the correct message", () => {
            expect(wrapper.find(CompanyDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
        });
    });

    describe("if no companies match the filter criteria", () => {

        const store = mockedStore(
            createTestState({ searchItem: "wz" })
        );

        const wrapper = shallow(<Companies store={store} />).dive();

        it("displays the correct message ", () => {
            expect(wrapper.find(CompanyDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(wrapper.instance().props.companies[0].message);
        });
    });

    describe("if there are companies that match the filter criteria", () => {

        const store = mockedStore(
            createTestState({ searchItem: "end" })
        );

        const wrapper = shallow(<Companies store={store} />).dive();

        it("renders a <CompanyDisplay /> component for each company", () => {
            expect(wrapper.find(CompanyDisplay)).toHaveLength(wrapper.instance().props.companies.length);
        });
    });
});