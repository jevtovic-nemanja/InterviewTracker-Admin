class CommService {
    constructor() { }

    getData(url, callback, errorCallback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => errorCallback(error));
    }

    deleteData(url, callback, errorCallback) {
        const init = { method: "DELETE" };

        fetch(url, init)
            .then(response => callback(response))
            .catch(error => errorCallback(error));
    }

    postData(url, data, callback, errorCallback) {
        const init = {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        };
        
        fetch(url, init)
            .then(response => callback(response))
            .catch(error => errorCallback(error));
    }
}

export const commService = new CommService();