import React from "react";
import TrackChild from "./TrackChild/TrackChild";

import "./Tracks.css";
import makeObject from "../../functions/makeObject";

const Tracks = ({ dbList }) => {
  const fileObject = makeObject(dbList[0]);

  return (
    <div>
      {fileObject.map((file, i) => (
        <div key={i}>
          <TrackChild
            audioFile={file.fileLocation}
            coverFile={file.coverLocation}
            storageLocation={file.storageLocation}
            trackKey={i}
          />
        </div>
      ))}
    </div>
  );
};

export default Tracks;
