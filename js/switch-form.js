const advertisementForm = document.querySelector('.ad-form');
const advertisementFormElements = advertisementForm.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.querySelectorAll('select, fieldset');

const switchElements = (elements, activate) => {
  elements.forEach((element) => {
    element.disabled = !activate;
  });
};

const turnOffForm = (form, elements) => {
  form.classList.add('ad-form--disabled');
  switchElements(elements, false);
};

const turnOnForm = (form, elements) => {
  switchElements(elements, true);
  form.classList.remove('ad-form--disabled');
};

turnOnForm(advertisementForm, advertisementFormElements);
turnOffForm(filterForm, filterFormElements);
