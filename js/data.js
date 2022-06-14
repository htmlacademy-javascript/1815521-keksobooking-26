//Раздел 4 Генерация данных
import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomSubArray, getRandomArrayOfElements} from './util.js';

const ADS_COUNT = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const MIN_ROOM_PRICE = 4000;
const MAX_ROOM_PRICE = 10000;
const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 5;
const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 8;
const MIN_PHOTOS_COUNT = 1;
const MAX_PHOTOS_COUNT = 3;

const ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];

const CHECKOUT_HOURS = ['12:00', '13:00', '14:00', ];

const ACCOMMODATION_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const ACCOMMODATION_DESCRIPTIONS = [
  'Уютное место для Вас и Вашего кота',
  'Одобрено мои котом',
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
];

const ACCOMMODATION_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAdvertisement = (id) => {
  const lat = getRandomFloat(MIN_LAT, MAX_LAT, 5);
  const lng = getRandomFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: `img/avatars/user${id < 10 ? '0' : ''}${id}.png`
    },
    offer: {
      title: `Advertisment №${id}`,
      address: `${lat}, ${lng}`,
      price: getRandomInt(MIN_ROOM_PRICE / 10, MAX_ROOM_PRICE / 10) * 10,
      type: getRandomArrayElement(ACCOMMODATION_TYPES),
      rooms: getRandomInt(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
      guests: getRandomInt(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
      checkin: getRandomArrayElement(CHECKIN_HOURS),
      checkout: getRandomArrayElement(CHECKOUT_HOURS),
      features: getRandomSubArray(ACCOMMODATION_FEATURES),
      description: getRandomArrayElement(ACCOMMODATION_DESCRIPTIONS),
      photos: getRandomArrayOfElements(ACCOMMODATION_PHOTOS, getRandomInt(MIN_PHOTOS_COUNT, MAX_PHOTOS_COUNT)),
    },
    location: {
      lat: lat,
      lng: lng,
    }
  };
};

const createAdvertisementArray = () => Array.from({
  length: ADS_COUNT
}, (_, k) => createAdvertisement(k + 1));

export {createAdvertisementArray};
