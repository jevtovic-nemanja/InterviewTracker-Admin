import React from "react";

import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Companies, { filterCompanies } from "Containers/create-report/wizard/companies/companies";

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

describe("<Companies />", () => {
    let wrapper;
    let store;

    const setUpTest = newProps => {
        store = mockedStore(
            {
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
                ...newProps
            }
        );

        wrapper = mount(
            <Provider store={store}>
                <Companies />
            </Provider>
        );
    };

    afterEach(() => {
        wrapper.unmount();
    });


    it("renders the correct components", () => {
        setUpTest();

        expect(wrapper.find(Search)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(2);
        expect(wrapper.find(Button).first().text()).toEqual("Back");
        expect(wrapper.find(Button).last().text()).toEqual("Next");
        expect(wrapper.find("table")).toHaveLength(1);
    });

    it("displays the correct message if fetching companies fails", () => {
        setUpTest({
            data: {
                companies: []
            },
            message: "message"
        });

        expect(wrapper.find(CompanyDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(store.getState().message);
    });

    it("displays the correct message if no companies match the filter criteria", () => {
        setUpTest({ searchItem: "wz" });

        expect(wrapper.find(CompanyDisplay)).toHaveLength(0);
        expect(wrapper.find(Message)).toHaveLength(1);
        expect(wrapper.find(Message).props().message).toEqual(Messages.NO_COMPANIES);
    });

    describe("if there are companies that match the filter criteria", () => {

        beforeEach(() => {
            setUpTest({ searchItem: "end" });
        });

        it("renders a <CompanyDisplay /> component for each company", () => {
            const state = store.getState();

            expect(wrapper.find(CompanyDisplay)).toHaveLength(filterCompanies(state.data.companies, state.searchItem).length);
        });

        it("calls the correct actions", () => {
            const company = store.getState().data.companies[0];

            wrapper.find(CompanyDisplay).first().props().handleClick();

            expect(store.getActions()).toEqual([selectElement(company.companyId), newReportCompany(company), enableNextPhase()]);
        });
    });
});