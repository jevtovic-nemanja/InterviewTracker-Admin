// import React from "react";

// import { configure, shallow, mount } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

// configure({
//     adapter: new Adapter
// })

// import { NextButton } from "./nextButton";

// import { DISABLED } from "Src/constants";

// const createTestProps = props => ({
//     next: "",
//     incrementPhase: jest.fn(),
//     newLocation: "#/new",
//     ...props
// });

// describe("<NextButton />", () => {

//     describe("if enabled", () => {
//         let props;
//         let wrapper;

//         beforeEach(() => {
//             props = createTestProps();
//             wrapper = shallow(<NextButton {...props} />);
//         });

//         it("displays the correct elements", () => {
//             expect(wrapper.find("button")).toHaveLength(1);
//             expect(wrapper.find("button").text()).toEqual("Next");
//             expect(wrapper.find("button").props().disabled).toBeFalsy();
//             expect(wrapper.find(".disabled")).toHaveLength(0);
//         });

//         it("calls incrementPhase and opens new location in navigator on click", () => {
//             wrapper.find("button").simulate("click");
//             expect(props.incrementPhase).toBeCalled();
//             expect(location.hash).toEqual(props.newLocation);
//         });
//     });

//     describe("if disabled", () => {
//         let props;
//         let wrapper;

//         beforeEach(() => {
//             props = createTestProps({
//                 next: DISABLED,
//                 newLocation: "#/not-called"
//             });
//             wrapper = mount(<NextButton {...props} />);
//         });

//         it("displays the correct elements", () => {
//             expect(wrapper.find("button")).toHaveLength(1);
//             expect(wrapper.find("button").text()).toEqual("Next");
//             expect(wrapper.find("button").props().disabled).toBeTruthy();
//             expect(wrapper.find(".disabled")).toHaveLength(1);
//         });

//         it("doesn't call incrementPhase nor opens a new location in navigator on click", () => {
//             wrapper.find("button").simulate("click");
//             expect(props.incrementPhase).not.toBeCalled();
//             expect(location.hash).not.toEqual(props.newLocation);
//         });
//     })
// });