const makeArray = (inputObj) => {
  const outputArray = Object.keys(Object.assign(inputObj[0]));

  return outputArray;
};

export default makeArray;
