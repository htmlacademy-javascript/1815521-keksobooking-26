const getRandomInt = (min, max) => {
  if (min < 0) {
    throw 'Incorrect \'min\' value';
  }

  if (max < 0) {
    throw 'Incorrect \'max\' value';
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return min + Math.floor(Math.random() * (max - min + 1));
};

function getRandomFloat(min, max, digits) {
  if (min < 0) {
    throw 'Incorrect \'min\' value';
  }

  if (max < 0) {
    throw 'Incorrect \'max\' value';
  }

  const result = Math.random() * (max - min) + min;

  return Number(result.toFixed(digits));
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const getRandomSubArray = (elements) => elements.filter(() => Math.random() < 0.5);
const getRandomArrayOfElements = (elements, length) => Array.from({
  length: length
}, () => getRandomArrayElement(elements));

const getWordEnging = (value, words) => {
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

export {
  getRandomInt,
  getRandomFloat,
  getRandomArrayElement,
  getRandomSubArray,
  getRandomArrayOfElements,
  getWordEnging,
};

