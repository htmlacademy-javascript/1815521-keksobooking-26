const getWordEnding = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (num > 1 && num < 5) {
    return words[1];
  }
  if (num === 1) {
    return words[0];
  }

  return words[2];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getWordEnding,
  isEscapeKey,
  debounce
};

