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
  const getGuestsText = (count) => getWordEnding(count, ['гостя', 'гостей', 'гостей']);
  popupCapacity.textContent = `${offer.rooms} ${getRoomsText(offer.rooms)} для ${offer.guests} ${getGuestsText(offer.guests)}`;

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

  const createPhotos = () => {
    const photoContainer = advertisementElement.querySelector('.popup__photos');
    const dataPhotoList = offer.photos;

    if (!dataPhotoList) {
      photoContainer.remove();
      return photoContainer;
    }

    photoContainer.replaceChildren(...offer.photos.map(
      (photo) => {
        const photoElement = advertisementElement.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = photo;

        return photoElement;
      }
    ));
  };

  createPhotos();

  return advertisementElement;
};

export {
  getAdvertisementElement
};
