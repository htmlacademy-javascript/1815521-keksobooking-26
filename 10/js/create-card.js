import {
  getWordEnding,
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

  const popupPrice = advertisementElement.querySelector('.js__card--price');
  popupPrice.textContent = offer.price;

  const popupType = advertisementElement.querySelector('.popup__type');
  popupType.textContent = accomodationTypeNames.get(offer.type);

  const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');

  const getRoomsText = (count) => getWordEnding(count, ['комната', 'комнаты', 'комнат']);
  const guestsText = getWordEnding(offer.guests, ['гостя', 'гостей', 'гостей']);
  popupCapacity.textContent = `${offer.rooms} ${getRoomsText(offer.rooms)} для ${offer.guests} ${guestsText}`;

  const popupTime = advertisementElement.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const popupDescription = advertisementElement.querySelector('.popup__description');
  popupDescription.textContent = offer.description ? offer.description : popupDescription.classList.add('hidden');

  const createFeatures = () => {
    const featuresContainer = advertisementElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');

    const dataFeaturesList = offer.features;

    if (!dataFeaturesList) {
      featuresContainer.remove();
      return featuresContainer;
    }

    featuresList.forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (features) => featureListItem.classList.contains(`popup__feature--${features}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  };

  createFeatures();

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

export {
  getAdvertisementElement
};
