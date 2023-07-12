const makeObject = (dbList) => {
  const inputValue = Object.values(dbList);

  let fileArray = [];

  for (let i = 0; i < inputValue.length; i++) {
    let fileLocationObj = Object.assign(inputValue[i].fileLocation);
    let coverLocationObj = Object.assign(inputValue[i].coverLocation);
    let storageLocationObj = Object.assign(inputValue[i].storageLocation);
    let combinedObj = Object.assign(
      {},
      fileLocationObj,
      coverLocationObj,
      storageLocationObj
    );

    fileArray = fileArray.concat(combinedObj);
  }

  return fileArray;
};

export default makeObject;
