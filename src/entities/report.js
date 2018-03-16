class Report {
    constructor(id, candidate, company, date, phase, status, note) {
        this._id = id;
        this._candidate = candidate;
        this._company = company;
        this._date = date;
        this._phase = phase;
        this._status = status;
        this._note = note;
    }

    get id() {
        return this._id;
    }

    get candidate() {
        return this._candidate;
    }

    get company() {
        return this._company;
    }

    get date() {
        return this._date;
    }

    get phase() {
        return this._phase;
    }

    get status() {
        return this._status;
    }

    get note() {
        return this._note;
    }
}

export default Report;