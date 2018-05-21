import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { Message } from "./message";

const createTestProps = props => ({
    message: "message",
    ...props
});

describe("<Message />", () => {
    const props = createTestProps();
    const wrapper = shallow(<Message {...props} />);

    it("displays the passed message", () => {
        expect(wrapper.find("h5").text()).toEqual(props.message);
    });
});