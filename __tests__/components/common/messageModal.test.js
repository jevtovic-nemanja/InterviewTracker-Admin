import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
})

import { MessageModal } from "Components/common/messageModal/messageModal";

const createTestProps = props => ({
    message: "message",
    close: jest.fn(),
    ...props
});

describe("<MessageModal />", () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = createTestProps();
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