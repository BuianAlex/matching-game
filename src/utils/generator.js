const generator = (cardListLength) => {
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
};

export default generator;
