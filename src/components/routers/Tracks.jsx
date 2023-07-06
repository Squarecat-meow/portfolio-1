import React from "react";

const Tracks = (props) => {
  return (
    <div>
      <span>{props.fileLocation}</span>
      <span>{props.coverLocation}</span>
    </div>
  );
};

export default Tracks;
