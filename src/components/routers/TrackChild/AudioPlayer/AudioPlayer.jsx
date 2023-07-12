import React from "react";

const AudioPlayer = (audioUrl) => {
  return (
    <div>
      <audio src={audioUrl} />
    </div>
  );
};

export default AudioPlayer;
