import React from "react";

import { shallow } from "enzyme";

import CreateReportPage from "Components/create-report/createReport/createReport";

import Aside from "Containers/create-report/wizard/aside/aside";
import { Switch, Route } from "react-router-dom";

describe("<createReportPage />", () => {

    it("renders the correct components", () => {
        const wrapper = shallow(<CreateReportPage />);
        
        expect(wrapper.find("main")).toHaveLength(1);
        expect(wrapper.find("aside")).toHaveLength(1);
        expect(wrapper.find(Aside)).toHaveLength(1);
        expect(wrapper.find(Switch)).toHaveLength(1);
        expect(wrapper.find(Route)).toHaveLength(3);
    });
});