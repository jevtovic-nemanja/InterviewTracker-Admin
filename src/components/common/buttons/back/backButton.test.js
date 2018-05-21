import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { BackButton } from "./backButton";

const createTestProps = props => ({
    decrementPhase: jest.fn(),
    newLocation: "#/new",
    ...props
});

describe("<BackButton />", () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<BackButton {...props} />);
    });

    it("displays the correct element", () => {
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").text()).toEqual("Back");
    });

    it("calls decrementPhase and opens new location in navigator on click", () => {
        wrapper.find("button").simulate("click");
        expect(props.decrementPhase).toBeCalled();
        expect(location.hash).toEqual(props.newLocation);
    });
});