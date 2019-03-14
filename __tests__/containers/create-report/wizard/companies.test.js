import React from "react";

import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Companies from "Containers/create-report/wizard/companies/companies";

import Search from "Containers/common/search/search";
import { CompanyDisplay } from "Components/create-report/wizard/companies/companyDisplay";
import { Message } from "Components/common/message/message";
import { Button } from "Components/common/button/button";

import {
    selectElement,
    enableNextPhase,
    newReportCompany
} from "Store/actions";

import { DISABLED, Messages } from "Src/constants";

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
    enableNextPhase: DISABLED,
    message: "",
    searchItem: "",
    selectedElementId: "",
    ...props
});

describe("<Companies />", () => {

    describe("always", () => {

        const store = mockedStore(
            createTestState()
        );

        const wrapper = mount(
            <Provider store={store}>
                <Companies />
            </Provider>
        );

        it("renders the correct components", () => {
            expect(wrapper.find(Search)).toHaveLength(1);
            expect(wrapper.find(Button)).toHaveLength(2);
            expect(wrapper.find(Button).first().text()).toEqual("Back");
            expect(wrapper.find(Button).last().text()).toEqual("Next");
            expect(wrapper.find("table")).toHaveLength(1);
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

        const wrapper = mount(
            <Provider store={store}>
                <Companies />
            </Provider>
        );;

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

        const wrapper = mount(
            <Provider store={store}>
                <Companies />
            </Provider>
        );;

        it("displays the correct message ", () => {
            expect(wrapper.find(CompanyDisplay)).toHaveLength(0);
            expect(wrapper.find(Message)).toHaveLength(1);
            expect(wrapper.find(Message).props().message).toEqual(Messages.NO_COMPANIES);
        });
    });

    describe("if there are companies that match the filter criteria", () => {
        let store;
        let wrapper;

        beforeEach(() => {
            store = mockedStore(
                createTestState({ searchItem: "end" })
            );
            wrapper = mount(
                <Provider store={store}>
                    <Companies />
                </Provider>
            );;
        });

        it("renders a <CompanyDisplay /> component for each company", () => {
            const state = store.getState();
            const companies = state.data.companies;
            const searchItem = state.searchItem;

            expect(wrapper.find(CompanyDisplay)).toHaveLength(companies.filter(company => company.name.toLowerCase().includes(searchItem)).length);
        });

        it("calls the correct actions", () => {
            const company = store.getState().data.companies[0];

            wrapper.find(CompanyDisplay).first().props().handleClick();

            expect(store.getActions()).toEqual([selectElement(company.companyId), newReportCompany(company), enableNextPhase()]);
        });
    });
});