/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = ({callback, data, method, responseType, url} = {} ) => {
    let xhr = new XMLHttpRequest();
    let basUrl = 'http://localhost:8000' + url;
    xhr.open(method, basUrl);
    xhr.responseType = responseType;
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.response['success'] === false) {
                callback(xhr.response['error'], xhr.response)
            } else {
                callback(null, xhr.response)
            }
        }
    }
};
