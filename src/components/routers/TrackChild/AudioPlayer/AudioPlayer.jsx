import React, { useEffect, useRef, useState } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import WaveSurfer from "wavesurfer.js";

import "./AudioPlayer.css";

const AudioPlayer = ({ audioUrl }) => {
  const [play, setPlay] = useState(false);
  const containerRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      wavesurfer.current = WaveSurfer.create({
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorWidth: 1,
        container: containerRef.current,
        height: 80,
        progressColor: "skyblue",
        waveColor: "#C4C4C4",
        cursorColor: "transparent",
      });
      wavesurfer.current.load(audioUrl);
    }
  }, []);

  const handlePlay = () => {
    setPlay(!play);
    wavesurfer.current.playPause();
  };

  return (
    <div className="waveform">
      <div className="playpause-button" onClick={handlePlay}>
        {play ? (
          <PauseOutlined style={{ fontSize: "48px" }} />
        ) : (
          <CaretRightOutlined style={{ fontSize: "48px" }} />
        )}
      </div>
      <div ref={containerRef} className="waveform-div">
        <div className="time-container">
          <span className="start-time">asdf</span>
          <span className="end-time">asdf</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
