import {
  getWordEnging
} from './util.js';

const MIN_GUESTS_COUNT = '0';
const MAX_ROOMS_COUNT = '100';
const MIN_ROOM_PRICE = 0;
const MAX_ROOM_PRICE = 100000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
}, false);

const titleInput = form.querySelector('#title');
pristine.addValidator(titleInput, (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH);

const priceInput = form.querySelector('#price');
pristine.addValidator(priceInput, (value) => value >= MIN_ROOM_PRICE && value <= MAX_ROOM_PRICE);

const guestsCountInput = form.querySelector('#capacity');
const roomsCountInput = form.querySelector('#room_number');
const accomodationOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const validateAccomodation = () => accomodationOptions[roomsCountInput.value].includes(Number(guestsCountInput.value));

const getRoomsText = (count) => getWordEnging(count, ['комнаты', 'комнат', 'комнат']);
function setGuestsErorrMessage() {
  if (guestsCountInput.value === MIN_GUESTS_COUNT) {
    return 'Ой-ой, не для гостей';
  }
  return `Необходимо не менее ${guestsCountInput.value} ${getRoomsText(guestsCountInput.value)} `;
}

const getGuestsText = (count) => getWordEnging(count, ['человека', 'человек', 'человек']);
function setRoomsErorrMessage() {
  if (roomsCountInput.value === MAX_ROOMS_COUNT) {
    return 'Ой-ой, не для гостей';
  }
  return `Не больше ${roomsCountInput.value} ${getGuestsText(roomsCountInput.value)}`;
}

pristine.addValidator(roomsCountInput, validateAccomodation, setRoomsErorrMessage);
pristine.addValidator(guestsCountInput, validateAccomodation, setGuestsErorrMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
