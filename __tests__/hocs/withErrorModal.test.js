import React from "react";

import { shallow } from "enzyme";

import Modal from "react-responsive-modal";

import Component from "./testableComponent";
import { withErrorModal } from "Hocs/withErrorModal/withErrorModal";
import { MessageModal } from "Components/common/messageModal/messageModal";

const ComponentWithErrorModal = withErrorModal(Component);

describe("withErrorModal()", () => {
    let wrapper;
    let props;

    const setUpTest = newProps => {
        props = {
            message: "",
            open: false,
            closeMessageModal: jest.fn(),
            ...newProps
        };

        wrapper = shallow(<ComponentWithErrorModal {...props} />);
    };

    beforeEach(() => {
        setUpTest();
    });

    it("always renders the correct components", () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(MessageModal)).toHaveLength(1);
        expect(wrapper.find(Component)).toHaveLength(1);
    });

    it("doesn't attempt to close the message modal if it is closed", () => {
        wrapper.find(MessageModal).props().close();
        expect(props.closeMessageModal).not.toBeCalled();
    });

    describe("if the message modal is open", () => {
        beforeEach(() => {
            setUpTest({
                open: true,
                message: "message"
            });
        });

        it("closes it", () => {
            wrapper.find(MessageModal).props().close();
            expect(props.closeMessageModal).toBeCalled();
        });

        it("displays the correct message", () => {
            expect(wrapper.find(MessageModal).props().message).toEqual(props.message);
        });
    });
});