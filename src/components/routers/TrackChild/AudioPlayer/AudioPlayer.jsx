import React, { useEffect, useRef, useState } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

import WaveSurfer from "wavesurfer.js";

import "./AudioPlayer.css";
import formatTimecode from "../../../../functions/formatTimecode";

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
      wavesurfer.current.on("ready", () => {
        setDuration(formatTimecode(wavesurfer.current.getDuration()));
      });
      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(formatTimecode(wavesurfer.current.getCurrentTime()));
      });

      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
        wavesurfer.current.stop();
      });
    }
  }, []);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    wavesurfer.current.playPause();
  };

  return (
    <div className="waveform">
      <div className="playpause-button" onClick={handlePlay}>
        {isPlaying ? (
          <PauseOutlined style={{ fontSize: "36px" }} />
        ) : (
          <CaretRightOutlined style={{ fontSize: "36px" }} />
        )}
      </div>
      <div ref={containerRef} className="waveform-div">
        <div className="time-container">
          <span className="start-time">
            {currentTime === 0 ? "00:00" : currentTime}
          </span>
          <span className="end-time">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
