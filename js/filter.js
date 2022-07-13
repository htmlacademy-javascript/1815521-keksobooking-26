import {
  markerGroup,
  createMarker
} from './map.js';

const CARDS_COUNT = 10;
const DEFAULT_VALUE = 'any';

const priceRange = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

const checkAccommodationType = ({
  offer
}) => {
  const accommodationTypeValue = document.querySelector('#housing-type').value;
  return accommodationTypeValue === DEFAULT_VALUE || offer.type === accommodationTypeValue ;
};

const checkPrice = ({
  offer
}) => {
  const priceValue = document.querySelector('#housing-price').value;
  return priceValue === DEFAULT_VALUE || offer.price <= priceRange[priceValue].max && offer.price >= priceRange[priceValue].min;
};

const checkRoomsCount = ({
  offer
}) => {
  const roomsCountValue = document.querySelector('#housing-rooms').value;
  return roomsCountValue === DEFAULT_VALUE || offer.rooms === Number(roomsCountValue);
};

const checkGuestsCount = ({
  offer
}) => {
  const guestsCountValue = document.querySelector('#housing-guests').value;
  return guestsCountValue === DEFAULT_VALUE ||offer.guests === Number(guestsCountValue);
};

const getSelectedCheckboxes = () => {
  const selectedCheckboxes = document.querySelectorAll('input[name="features"]:checked');
  const values = Array.from(selectedCheckboxes, ({
    value
  }) => value);

  return values;
};

const checkFeatures = ({
  offer
}) => {
  const filtersFeatures = getSelectedCheckboxes();

  if (offer.features) {
    return filtersFeatures.every((feature) => offer.features.includes(feature));
  }

  return false;
};

const filterAdvertisments = (advertisments) => {
  markerGroup.clearLayers();

  const advertismentsFilter = advertisments.filter((advertisment) => (checkAccommodationType(advertisment) && checkPrice(advertisment) &&
  checkRoomsCount(advertisment) && checkGuestsCount(advertisment) && checkFeatures(advertisment))).slice(0, CARDS_COUNT);

  advertismentsFilter.forEach(createMarker);
};

const onFilterChange = (cb) => {
  const filterForm = document.querySelector('.map__filters');
  filterForm.addEventListener('change', cb);
};


export {
  filterAdvertisments,
  onFilterChange
};
