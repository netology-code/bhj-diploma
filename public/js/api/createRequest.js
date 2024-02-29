/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  try {
    if (options.method === 'GET') {
      let url = options.url;

      if (Object.keys(options.data).length) {
        url += '?' + Object.entries(options.data)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      }

      xhr.open(options.method, url);
      xhr.send();
    } else {
      const formData = new FormData;

      Object.entries(options.data).forEach(([key, value]) => (formData.append(key, value)));

      xhr.open(options.method, options.url);
      xhr.send(formData);
    }

    xhr.responseType = 'json'; // формат, в котором необходимо выдать результат
    xhr.onload = function () {
      console.log(xhr.response);

      if (xhr.response) {
        options.callback(xhr.response.error, xhr.response);
      }
    };
  } catch (e) {
    options.callback(e);
  }
};
