import { listAll, ref } from "firebase/storage";
import React from "react";
import { storage } from "../../config/firebase";

const makeFilelocation = (input) => {
  const inputFileValue = Object.values(input);

  let outputArray = new Array();

  for (let i = 0; i < inputFileValue.length; i++) {
    outputArray.push(inputFileValue[i].fileLocation.fileLocation);
  }
  return outputArray;
};

const makeCoverlocation = (input) => {
  const inputCoverValue = Object.values(input);

  let outputArray = new Array();

  for (let i = 0; i < inputCoverValue.length; i++) {
    outputArray.push(inputCoverValue[i].coverLocation.coverLocation);
  }
  return outputArray;
};

const Tracks = ({ dbTree }) => {
  const fileLocationArr = makeFilelocation(dbTree);
  const coverLocationArr = makeCoverlocation(dbTree);

  console.log(coverLocationArr);

  return <div>Tracks</div>;
};

export default Tracks;
