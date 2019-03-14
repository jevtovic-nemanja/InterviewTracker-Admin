import React from "react";

import { shallow } from "enzyme";

import { CandidateDisplay } from "Components/create-report/wizard/candidates/candidateDisplay";

describe("<CandidateDisplay />", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            candidate: {
                candidateId: 27,
                name: "John Doe",
                email: "john.doe@email.com",
                avatar: "url"
            },
            selected: "",
            handleClick: jest.fn(),
            ...newProps
        };

        wrapper = shallow(<CandidateDisplay {...props} />);
    };

    describe("always", () => {
        beforeEach(() => {
            setUpTest();
        });

        it("displays the correct data", () => {
            expect(wrapper.find("h5").text()).toEqual(props.candidate.name);
            expect(wrapper.find("p").text()).toEqual(props.candidate.email);
            expect(wrapper.find("img").props().src).toEqual(props.candidate.avatar);
        });

        it("calls the correct method on click", () => {
            wrapper.simulate("click");
            expect(props.handleClick).toBeCalled();
        });
    });

    it("applies selected styles when selected", () => {
        setUpTest({
            selected: 27
        });

        expect(wrapper.find(".selected")).toHaveLength(1);
    });

    it("displays the default avatar when no avatar is provided", () => {
        setUpTest({
            candidate: {
                candidateId: 27,
                name: "John Doe",
                email: "john.doe@email.com",
                avatar: ""
            }
        });

        expect(wrapper.find("img").props().src).toEqual("");
    });
});