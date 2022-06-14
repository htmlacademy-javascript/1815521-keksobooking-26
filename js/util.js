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

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomSubArray, getRandomArrayOfElements};
