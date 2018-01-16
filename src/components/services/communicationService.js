class CommService {
    constructor() { }

    getData(url, callback, errorCallback) {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    errorCallback("error");
                }
            })
            .then(data => callback(data))
            .catch(error => errorCallback("networkError"));
    }
}

export const commService = new CommService();