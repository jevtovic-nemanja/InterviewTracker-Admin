class Candidate {
    constructor(candidateId, name, email, avatar) {
        this._candidateId = candidateId;
        this._name = name;
        this._email = email;
        this._avatar = avatar;
    }

    get candidateId() {
        return this._candidateId;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get avatar() {
        return this._avatar;
    }
}

export default Candidate;