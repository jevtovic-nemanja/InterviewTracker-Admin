class Company {
    constructor(companyId, name) {
        this._companyId = companyId;
        this._name = name;
    }

    get companyId() {
        return this._companyId;
    }

    get name() {
        return this._name;
    }
}

export default Company;