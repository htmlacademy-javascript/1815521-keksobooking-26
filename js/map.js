import {
  turnOnForm,
  turnOffForm
} from './switch-form.js';
import {
  getAdvertisementElement
} from './create-card.js';
import {
  filterAdvertisments,
  onFilterChange
} from './filter.js';
import {
  getData
} from './api.js';
import {
  debounce
} from './util.js';

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


const setAddressInput = () => {
  addressInput.setAttribute('readonly', true);
  addressInput.value = `${START_LAT.toFixed(NUMBER_OF_DECIMAL)}, ${START_LNG.toFixed(NUMBER_OF_DECIMAL)}`;
};

const dataFromServer = getData();

const showMapMarkers = () => dataFromServer.then(
  (data) => data.slice().slice(0, 10).forEach(createMarker)).then(
  () => turnOnForm(filterForm, filterFormElements)
);

const filterMapMarkers = () => dataFromServer.then((data) =>
  onFilterChange(debounce(() => {
    filterAdvertisments(data);
  })));

const map = L.map('map-canvas')
  .on('load', () => {
    showMapMarkers();
    filterMapMarkers();
    setAddressInput();
    turnOnForm(advertisementForm, advertisementFormElements);
    sliderElement.removeAttribute('disabled');
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

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_OF_DECIMAL)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_OF_DECIMAL)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function createMarker(advertisment) {
  const marker = L.marker({
    lat: advertisment.location.lat,
    lng: advertisment.location.lng,
  }, {
    icon,
  }, );

  marker
    .addTo(markerGroup)
    .bindPopup(getAdvertisementElement(advertisment));
}

const resetMap = () => {
  markerGroup.clearLayers();
  mainPinMarker.setLatLng({
    lat: START_LAT,
    lng: START_LNG,
  });
  map
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, 10)
    .closePopup();

  showMapMarkers();
};

export {
  markerGroup,
  createMarker,
  setAddressInput,
  resetMap
};
