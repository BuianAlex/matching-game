export function generator(cardListLength) {
  let resultArray = [];

  const setRandomPosition = (resultArray, index) => {
    const randIndex = Math.floor(Math.random() * cardListLength);
    if (resultArray[randIndex] !== null) {
      setRandomPosition(resultArray, index);
    } else {
      resultArray[randIndex] = index;
    }
  };

  for (let index = 0; index < cardListLength; index++) {
    resultArray.push(null);
  }

  for (let index = 0; index < cardListLength / 2; index++) {
    for (let j = 0; j < 2; j++) {
      setRandomPosition(resultArray, index);
    }
  }
  return resultArray;
}

export function dateFormat(time) {
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / 1000 / 60) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  // let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return `${String(hours).length === 1 ? `0${hours}` : hours}:${
    String(minutes).length === 1 ? `0${minutes}` : minutes
  }:${String(seconds).length === 1 ? `0${seconds}` : seconds}`;
}
