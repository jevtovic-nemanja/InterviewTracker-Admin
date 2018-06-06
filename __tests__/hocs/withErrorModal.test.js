import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import configureStore from "redux-mock-store";

configure({
    adapter: new Adapter
});

import Modal from "react-responsive-modal";

import Component from "./testableComponent";
import { withErrorModal } from "Hocs/withErrorModal/withErrorModal";
import { MessageModal } from "Components/common/messageModal/messageModal";

const ComponentWithErrorModal = withErrorModal(Component);

const mockedMiddleware = [];
const mockedStore = configureStore(mockedMiddleware);

const createTestProps = props => ({
    message: "",
    open: false,
    closeMessageModal: jest.fn(),
    ...props
});

describe("withErrorModal()", () => {

    describe("always", () => {
        const props = createTestProps();
        const wrapper = shallow(<ComponentWithErrorModal {...props} />);

        it("should render the correct components", () => {
            expect(wrapper.find(Modal)).toHaveLength(1);
            expect(wrapper.find(MessageModal)).toHaveLength(1);
            expect(wrapper.find(Component)).toHaveLength(1);
        });
    });

    describe("if the message modal is closed", () => {
        const props = createTestProps();
        const wrapper = shallow(<ComponentWithErrorModal {...props} />);

        it("doesn't attempt to close it", () => {
            wrapper.find(MessageModal).props().close();
            expect(props.closeMessageModal).not.toBeCalled()
        });
    })

    describe("if the message modal is open", () => {
        const props = createTestProps({
            open: true,
            message: "message"
        });
        const wrapper = shallow(<ComponentWithErrorModal {...props} />);

        it("closes it", () => {
            wrapper.find(MessageModal).props().close();
            expect(props.closeMessageModal).toBeCalled()
        });

        it("displays the correct message", () => {
            expect(wrapper.find(MessageModal).props().message).toEqual(props.message);
        });
    })
});