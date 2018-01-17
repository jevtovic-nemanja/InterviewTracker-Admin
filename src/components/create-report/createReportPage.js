import React from "react";

import { Aside } from "../create-report/wizard/aside";
import { SelectCandidate } from "../create-report/wizard/candidates";
import { SelectCompany } from "../create-report/wizard/companies";
import { FillReport } from "../create-report/wizard/fill-report";

class CreateReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();

        this.bindEventHandlers();
    }

    initState() {
        return {

        };
    }

    bindEventHandlers() {

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <aside className="col-4">
                        <Aside />
                    </aside>
                    <main className="col-8">
                        <SelectCandidate />
                        <SelectCompany />
                        <FillReport />
                    </main>
                </div>
            </div>
        );
    }
}

export default CreateReportPage;