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

export {turnOnForm, turnOffForm};


