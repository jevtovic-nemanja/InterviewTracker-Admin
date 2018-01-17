class Candidate {
    constructor(id, name, email, avatar) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._avatar = avatar;
    }

    get id() {
        return this._id;
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