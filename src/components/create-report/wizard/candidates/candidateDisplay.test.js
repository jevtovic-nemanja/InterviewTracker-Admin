import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { CandidateDisplay } from "./candidateDisplay";

const createTestProps = props => ({
    candidate: {
        candidateId: 27,
        name: "John Doe",
        email: "john.doe@email.com",
        avatar: "url"
    },
    selected: "",
    handleClick: jest.fn(),
    ...props
});

describe("<CandidateDisplay />", () => {

    describe("always", () => {
        let props;
        let wrapper;

        beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<CandidateDisplay {...props} />);
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

    describe("when selected", () => {
        const props = createTestProps({
            selected: 27
        });

        const wrapper = shallow(<CandidateDisplay {...props} />);

        it("applies selected styles", () => {
            expect(wrapper.find(".selected")).toHaveLength(1);
        });
    });

    describe("when no avatar is provided", () => {
        const props = createTestProps({
            candidate: {
                candidateId: 27,
                name: "John Doe",
                email: "john.doe@email.com",
                avatar: ""
            }
        });

        const wrapper = shallow(<CandidateDisplay {...props} />);

        it("displays the default avatar", () => {
            expect(wrapper.find("img").props().src).toEqual({});
        });
    });
});