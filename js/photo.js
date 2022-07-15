const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW_IMAGE = 'img/muffin-grey.svg';
const DEFAULT_PHOTO_WIDTH = 70;
const DEFAULT_PHOTO_HEIGHT = 70;

const userPhotoChooser = document.querySelector('#avatar');
const userPhotoPreview = document.querySelector('.ad-form-header__preview img');

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    userPhotoPreview.src = URL.createObjectURL(file);
  }
});

const resetUserPhotoInput = () => {
  const photoInput = document.querySelector('.ad-form-header__input');
  photoInput.value = '';

  userPhotoPreview.src = DEFAULT_PREVIEW_IMAGE;
};

const accommodationPhotoChooser = document.querySelector('#images');
const accommodationPhotoPreview = document.querySelector('.ad-form__photo');

const resetAccommodationPhotoInput = () => {
  accommodationPhotoPreview.innerHTML = '';
};

accommodationPhotoChooser.addEventListener('change', () => {
  const file = accommodationPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    resetAccommodationPhotoInput();

    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.width = DEFAULT_PHOTO_WIDTH;
    photo.height = DEFAULT_PHOTO_HEIGHT;

    accommodationPhotoPreview.append(photo);
  }
});

export {
  resetUserPhotoInput,
  resetAccommodationPhotoInput
};
