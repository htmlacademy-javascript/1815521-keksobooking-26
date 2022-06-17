import {
  createAdvertisementArray
} from './data.js';
import {
  getWordEnging
} from './util.js';

const usersAdvertimentsTemplate = document.querySelector('#card').content.querySelector('.popup');

const accomodationTypeNames = new Map();
accomodationTypeNames.set('palace', 'Дворец');
accomodationTypeNames.set('flat', 'Квартира');
accomodationTypeNames.set('house', 'Дом');
accomodationTypeNames.set('bungalow', 'Бунгало');
accomodationTypeNames.set('hotel', 'Отель');

const getAdvertisementElement = ({
  author,
  offer
}) => {
  const advertisementElement = usersAdvertimentsTemplate.cloneNode(true);

  const popupAvatar = advertisementElement.querySelector('.popup__avatar');
  popupAvatar.src = author.avatar;

  const popupTitle = advertisementElement.querySelector('.popup__title');
  popupTitle.textContent = offer.title;

  const popupAddress = advertisementElement.querySelector('.popup__text--address');
  popupAddress.textContent = offer.address;

  const popupPrice = advertisementElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;

  const popupType = advertisementElement.querySelector('.popup__type');
  popupType.textContent = accomodationTypeNames.get(offer.type);

  const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');

  const roomsText = getWordEnging(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guestsText = getWordEnging(offer.guests, ['гостя', 'гостей', 'гостей']);
  popupCapacity.textContent = `${offer.rooms} ${roomsText} для ${offer.guests} ${guestsText}`;

  const popupTime = advertisementElement.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const popupDescription = advertisementElement.querySelector('.popup__description');
  popupDescription.textContent = offer.description ? offer.description : popupDescription.classList.add('hidden');

  const featuresContainer = advertisementElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((features) => `popup__feature--${features}`);
  featuresList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  if (featuresContainer.childElementCount === 0) {
    featuresContainer.classList.add('hidden');
  }

  const photoContainer = advertisementElement.querySelector('.popup__photos');
  photoContainer.replaceChildren(...offer.photos.map(
    (photo) => {
      const photoElement = advertisementElement.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;

      return photoElement;
    }
  ));

  if (photoContainer.childElementCount === 0) {
    photoContainer.classList.add('hidden');
  }

  return advertisementElement;
};

const renderAllAdvertisements = (advertisementsData) => {
  const fragment = document.createDocumentFragment();
  advertisementsData.forEach((advertisement) => {
    fragment.append(getAdvertisementElement(advertisement));
  });
  document.querySelector('#map-canvas').append(fragment);
};

const advertisements = createAdvertisementArray();

renderAllAdvertisements(advertisements.slice(0, 1));
