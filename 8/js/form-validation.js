import {
  getWordEnding
} from './util.js';

const MIN_GUESTS_COUNT = '0';
const MAX_ROOMS_COUNT = '100';
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

const onTitleInputBlur = () => pristine.validate(titleInput);
titleInput.addEventListener('blur', onTitleInputBlur);

const guestsCountInput = form.querySelector('#capacity');
const roomsCountInput = form.querySelector('#room_number');
const accommodationCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const validateAccommodation = () => accommodationCapacity[roomsCountInput.value].includes(Number(guestsCountInput.value));

const getRoomsText = (count) => getWordEnding(count, ['комнаты', 'комнат', 'комнат']);
const setGuestsErorrMessage = () => {
  if (guestsCountInput.value === MIN_GUESTS_COUNT) {
    return 'Ой-ой, не для гостей';
  }
  return `Необходимо не менее ${guestsCountInput.value} ${getRoomsText(guestsCountInput.value)} `;
};

const getGuestsText = (count) => getWordEnding(count, ['человека', 'человек', 'человек']);
const setRoomsErorrMessage = () => {
  if (roomsCountInput.value === MAX_ROOMS_COUNT) {
    return 'Ой-ой, не для гостей';
  }
  return `Не больше ${roomsCountInput.value} ${getGuestsText(roomsCountInput.value)}`;
};

pristine.addValidator(roomsCountInput, validateAccommodation, setRoomsErorrMessage);
pristine.addValidator(guestsCountInput, validateAccommodation, setGuestsErorrMessage);

const priceInput = form.querySelector('#price');
const accommodationTypeField = document.querySelector('#type');
const MinPriceForAccommodationType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const getMinPrice = () => Number(MinPriceForAccommodationType[accommodationTypeField.value]);
const validatePrice = (value) => value >= getMinPrice() && value <= MAX_ROOM_PRICE;

const setPriceErrorMessage = () => `Минимальная цена ${getMinPrice()}, максимальная цена ${MAX_ROOM_PRICE}`;
pristine.addValidator(priceInput, validatePrice, setPriceErrorMessage);

const onTypeOptionChange = (evt) => {
  priceInput.placeholder = MinPriceForAccommodationType[evt.target.value];
  pristine.validate(priceInput);
};
accommodationTypeField.addEventListener('change', onTypeOptionChange);

const onTypeOptionBlur = () => pristine.validate(priceInput);
priceInput.addEventListener('blur', onTypeOptionBlur);

const checkInField = document.querySelector('#timein');
const checkOutField = document.querySelector('#timeout');

checkInField.addEventListener('change', (evt) => {
  checkOutField.value = evt.target.value;
});

checkOutField.addEventListener('change', (evt) => {
  checkInField.value = evt.target.value;
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    window.console.log('Можно отправлять');
  } else {
    window.console.log('Форма невалидна');
  }
});
