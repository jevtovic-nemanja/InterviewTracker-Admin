import React from "react";

import { shallow } from "enzyme";

import App from "Src/app";

import Header from "Containers/common/header/header";
import { Switch, Route } from "react-router-dom";

describe("<App />", () => {

    it("renders the correct components", () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find(Header)).toHaveLength(1);
        expect(wrapper.find(Switch)).toHaveLength(1);
        expect(wrapper.find(Route)).toHaveLength(2);
    });
});