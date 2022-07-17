import {
  showAlert
} from './message.js';

const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then(onSuccess)
  .catch((error) => {
    showAlert(error);
  });

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {
  getData,
  sendData
};
