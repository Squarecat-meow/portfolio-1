import React, { useEffect, useState } from "react";
import { ref, getMetadata } from "firebase/storage";

import { storage } from "../../../config/firebase";

import "./TrackChild.css";

const TrackChild = ({ audioFile, coverFile, storageLocation }) => {
  const [metadataState, setMetadataState] = useState("");

  const fileRef = ref(storage, `${storageLocation}`);

  useEffect(() => {
    getMetadata(fileRef).then((metadata) => {
      setMetadataState(metadata.customMetadata);
    });
  }, [fileRef]);

  return (
    <div className="track-container">
      <div className="cover-div">
        <img
          style={{ width: "150px", height: "150px" }}
          src={coverFile}
          alt="Cover File"
        />
      </div>
      <div className="track-text-container">
        <h1 className="track-row">{metadataState.Title}</h1>
        <h4 className="track-row">{metadataState.Genre}</h4>
        <audio style={{ marginLeft: "10px" }} controls src={audioFile} />
      </div>
    </div>
  );
};

export default TrackChild;
