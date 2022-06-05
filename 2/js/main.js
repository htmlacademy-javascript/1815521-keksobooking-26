//Функция, возвращающая случайное целое число из переданного диапазона включительно
//Использованы данные с сайта MDN
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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

getRandomInt(1, 5);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
//Использованы данные с сайта MDN
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max, digits) {
  if (min < 0) {
    throw 'Incorrect \'min\' value';
  }

  if (max < 0) {
    throw 'Incorrect \'max\' value';
  }

  const result = Math.random() * (max - min) + min;

  return Number(result.toFixed(digits));
}

getRandomArbitrary(1, 3, 1);
