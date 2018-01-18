import React from "react";

export const Aside = props => {
    let bottomLine;
    let candidate;
    let company;
    let selectCandidate;
    let selectCompany;
    let fillReport;
    let showBack;
    let enableNext;

    switch (props.phase) {
    case 1:
        bottomLine = "";
        candidate = "d-none";
        company = "d-none";
        selectCandidate = "font-weight-bold";
        selectCompany = "text-muted d-none d-md-inline-block";
        fillReport = "text-muted d-none d-md-inline-block";
        showBack = "d-none";
        break;
    case 2:
        bottomLine = "bottom-line-aside";
        candidate = "";
        company = "d-none";
        selectCandidate = "text-muted d-none d-md-inline-block";
        selectCompany = "font-weight-bold";
        fillReport = "text-muted d-none d-md-inline-block";
        showBack = "";
        break;
    case 3:
        bottomLine = "bottom-line-aside";
        candidate = "";
        company = "";
        selectCandidate = "text-muted d-none d-md-inline-block";
        selectCompany = "text-muted d-none d-md-inline-block";
        fillReport = "font-weight-bold";
        showBack = "";
        break;
    }

    const { candidateName, companyName } = props.info;

    return (
        <div className="row wizard-aside h-100 mb-3">
            <div className="col-12">
                <div className={bottomLine}>
                    <h5 className={`${selectCandidate} mt-3`}>
                        <small className={`${selectCandidate} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">1</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Select Candidate
                        </span>
                    </h5>
                    <h5 className={`${selectCompany} mt-3`}>
                        <small className={`${selectCompany} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">2</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Select Company
                        </span>
                    </h5>
                    <h5 className={`${fillReport} mt-3 mb-4`}>
                        <small className={`${fillReport} fa-stack`}>
                            <span className="fa fa-circle-thin fa-stack-2x"></span>
                            <strong className="fa-stack-1x">3</strong>
                        </small>
                        <span className="pl-2 move-down">
                            Fill Report Detail
                        </span>
                    </h5>
                </div>
                <div>
                    <div className={`${candidate} pl-1`}>
                        <p className="mt-3 mb-1">Candidate:</p>
                        <h4>{candidateName}</h4>
                    </div>
                    <div className={`${company} pl-1`}>
                        <p className="mb-1">Company:</p>
                        <h4>{companyName}</h4>
                    </div>
                </div>
                <button type="button" className={`${showBack} btn btn-back w-100 mt-3 mb-2`} onClick={props.onBack}>Back</button>
                <button type="button" className={`${props.next} btn btn-next w-100`} onClick={props.onNext} disabled={props.next}>Next</button>
            </div>
        </div>
    );
};