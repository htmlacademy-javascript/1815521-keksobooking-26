import {
  isEscapeKey
} from './util.js';

const ALERT_TIMEOUT = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('show-alert');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIMEOUT);
};

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showMessage = (template) => {
  const message = template.cloneNode(true);

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onMessageClick = () => {
    closeMessage();
  };

  function closeMessage () {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  message.addEventListener('click', onMessageClick);

  document.body.append(message);
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate);
};

export {
  showAlert,
  showSuccessMessage,
  showErrorMessage
};
