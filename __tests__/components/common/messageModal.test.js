import React from "react";

import { shallow } from "enzyme";

import { MessageModal } from "Components/common/messageModal/messageModal";

describe("<MessageModal />", () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            message: "message",
            close: jest.fn()
        };
        wrapper = shallow(<MessageModal {...props} />);
    });

    it("displays the correct elements", () => {
        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("button")).toHaveLength(1);
        expect(wrapper.find("button").text()).toEqual("Close");
        expect(wrapper.find(".float-right")).toHaveLength(1);
    });

    it("displays the passed message", () => {
        expect(wrapper.find("p").text()).toEqual(props.message);
    });

    it("closes the modal on click", () => {
        wrapper.find("button").simulate("click");
        expect(props.close).toBeCalled();
    });
});