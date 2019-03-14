import React from "react";

import { shallow } from "enzyme";

import { Message } from "Components/common/message/message";

describe("<Message />", () => {
    const props = {message: "message"};
    const wrapper = shallow(<Message {...props} />);

    it("displays the passed message", () => {
        expect(wrapper.find("h5").text()).toEqual(props.message);
    });
});