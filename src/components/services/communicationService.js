class CommService {
    constructor() { }

    getData(url, callback, errorCallback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => errorCallback(error));
    }
}

export const commService = new CommService();