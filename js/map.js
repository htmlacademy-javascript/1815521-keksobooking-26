import {
  turnOnForm,
  turnOffForm
} from './switch-form.js';
import {
  createAdvertisementArray
} from './data.js';
import {
  getAdvertisementElement
} from './create-card.js';

const START_LAT = 35.68950;
const START_LNG = 139.69200;
const NUMBER_OF_DECIMAL = 5;

const advertisementForm = document.querySelector('.ad-form');
const advertisementFormElements = advertisementForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.querySelectorAll('select, fieldset');
const sliderElement = document.querySelector('.ad-form__slider');
const addressInput = document.querySelector('#address');

turnOffForm(filterForm, filterFormElements);
turnOffForm(advertisementForm, advertisementFormElements);
sliderElement.setAttribute('disabled', true);

const map = L.map('map-canvas')
  .on('load', () => {
    turnOnForm(filterForm, filterFormElements);
    turnOnForm(advertisementForm, advertisementFormElements);
    sliderElement.removeAttribute('disabled');
    addressInput.setAttribute('readonly', true);
  })
  .setView({
    lat: START_LAT,
    lng: START_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: START_LAT,
  lng: START_LNG,
}, {
  draggable: true,
  icon: mainPinIcon,
}, );

mainPinMarker.addTo(map);

addressInput.value = `${START_LAT.toFixed(NUMBER_OF_DECIMAL)}, ${START_LNG.toFixed(NUMBER_OF_DECIMAL)}`;

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_DECIMAL)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_DECIMAL)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const advertisementCard = createAdvertisementArray();

const createMarker = (card) => {
  const marker = L.marker({
    lat: card.location.lat,
    lng: card.location.lng,
  }, {
    icon,
  }, );

  marker
    .addTo(markerGroup)
    .bindPopup(getAdvertisementElement(card));
};

advertisementCard.forEach((card) => {
  createMarker(card);
});
