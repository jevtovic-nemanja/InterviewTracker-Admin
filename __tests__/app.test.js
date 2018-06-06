import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
    adapter: new Adapter
});

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